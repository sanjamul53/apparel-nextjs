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

    if(!reqBody || !reqBody.hasOwnProperty('orderID')) {
      throw new Error('invalid orderID');
    }

    const orderID = reqBody.orderID;

    if(!orderID || !isValidObjectId(orderID)) {
      throw new Error('invalid orderID');
    }

    await dbConnect();

    // get target order
    const targetOrder = await Orders.findOne({
      _id: stringToObjectId(orderID)
    })
    .select({
      _id: 1, total_price: 1, paid_amount: 1, status: 1
    })
    .lean();


    if(!targetOrder || targetOrder.total_price <= 0 ) {
      throw new Error('Invalid order');
    }

    // check if order is already paid
    if(
      targetOrder.status !== 'pending' && 
      targetOrder.paid_amount >= targetOrder.total_price
    ) {
      throw new Error('Payment already completed');
    }

    // get access token
    const accessToken = await generateAccessToken();

    if(!accessToken) {
      throw new Error('Failed to access paypal');
    }


    const paypal_url = `${base_url}/v2/checkout/orders`;


    const response = await fetch(paypal_url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",

      body: JSON.stringify({

        intent: "CAPTURE",

        purchase_units: [
          {
            amount: { 
              currency_code: "USD", 
              value: targetOrder.total_price 
            },
            invoice_id: `${targetOrder._id}`
          }
        ],

      })


    });

    if(!response.ok) {

      const err_data = await response.json();

      console.log(err_data);

      throw new Error('Failed to complete payment');
    }

    const resData = await response.json();

    return NextResponse.json(resData);

  }
  catch(e) {
    return error_response(e);
  }

}
