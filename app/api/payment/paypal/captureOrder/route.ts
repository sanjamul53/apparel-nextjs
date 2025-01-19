import { error_response } from '@/apiServer/controller/err_res';
import { generateAccessToken } from
  '@/apiServer/controller/payment/paypal/generateAccessToken';
import { api_payment_paypal_base_url as base_url } from '@/apiServer/data/payment.data';
import { isValidObjectId } from '@/apiServer/functions/isValidObjectId';
import { stringToObjectId } from '@/apiServer/functions/stringToObjectId';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Orders } from '@/apiServer/models/order.model.';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(request: NextRequest) {

  try {

    const reqBody = await request.json();


    if (!reqBody || !reqBody.hasOwnProperty('orderID')) {
      throw new Error('invalid orderID');
    }

    const orderID = reqBody.orderID;

    if (!orderID || typeof orderID !== 'string') {
      throw new Error('invalid orderID');
    }

    // get access token
    const accessToken = await generateAccessToken();

    if (!accessToken) {
      throw new Error('Failed to complete payment');
    }


    // capture order from paypal
    const paypal_url = `${base_url}/v2/checkout/orders/${orderID}/capture`;

    const pay_req = await fetch(paypal_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!pay_req.ok) {

      const err_data = await pay_req.json();

      console.log(err_data);

      throw new Error('Failed to get payment');
    }

    const pay_res: any = await pay_req.json();


    // check paypal response
    if (pay_res.status !== 'COMPLETED') {
      throw new Error('invalid payment');
    }

    const purcahseUnit = pay_res.purchase_units[0];

    if (!purcahseUnit) {
      throw new Error('invalid payment');
    }

    const purcahseUnit_payment = purcahseUnit.payments.captures[0];

    if (
      !purcahseUnit_payment || 
      !purcahseUnit_payment.invoice_id || 
      !isValidObjectId(purcahseUnit_payment.invoice_id) ||
      !purcahseUnit_payment.id
    ) {
      throw new Error('invalid payment');
    }

    const paymentData = {
      order_id: stringToObjectId(purcahseUnit_payment.invoice_id),
      transaction_id: purcahseUnit_payment.id,
      paypal_orderId: pay_res.id,
      total_paid: Number(purcahseUnit_payment.amount.value)
    }

    if (paymentData.total_paid <= 0) {
      throw new Error('invalid payment');
    }

    // ============ update db ============

    await dbConnect();

    await Orders.updateOne(
      {
        _id: paymentData.order_id
      },
      [

        {
          $set: {
            // =============== update status ===============
            status: {
              $cond: {
                if: {
                  $and: [
                    {
                      $eq: ['$status', 'pending']
                    },
                    {
                      $gte: [
                        { $add: ['$paid_amount', paymentData.total_paid] },
                        '$total_price'
                      ]
                    }
                  ]

                },
                then: 'paid',
                else: '$status'
              }
            },

            paid_amount: { 
              $add: ['$paid_amount', paymentData.total_paid] 
            },

            payment_record: {
              method: 'paypal',
              transaction_id: paymentData.transaction_id,
              order_id: paymentData.paypal_orderId,
              paid_at: new Date(Date.now())
            }

          }

        }
      ]
    )


    return NextResponse.json({
      status: 'payment completed'
    });

  }
  catch (e) {
    return error_response(e);
  }

}
