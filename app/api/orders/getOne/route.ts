import { auth_guard } from '@/apiServer/controller/auth/auth_guard';
import { error_response } from '@/apiServer/controller/err_res';
import { api_order_paginate_doc_count } from '@/apiServer/data/orders.data';
import { isValidObjectId } from '@/apiServer/functions/isValidObjectId';
import { is_integer } from '@/apiServer/functions/is_integer';
import { stringToObjectId } from '@/apiServer/functions/stringToObjectId';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Orders } from '@/apiServer/models/order.model.';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

  try {

    // check auth
    const authData = await auth_guard();

    const searchParams = request.nextUrl.searchParams;

    // page param
    const id_param = searchParams.get('id');

    if(!id_param || !isValidObjectId(id_param)) {
      throw new Error('Invalid order');
    }

    await dbConnect();

    const orderDetail = await Orders.aggregate([

      {
        $match: {
          _id: stringToObjectId(id_param),
          user_id: stringToObjectId(authData._id)
        }
      },
      {
        $unwind: '$products'
      },

      {
        $lookup: {
          from: 'products',
          let: { productId: '$products._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [ '$$productId', '$_id' ]
                }
              }
            },
            {
              $project: {
                _id: 1, name: 1, brand: 1,
                primary_img: '$image_variation',
              }
            }
          ],
          as: 'productData'
        }
      },

      // check if product is found
      {
        $match: {
          productData: { $size: 1 }
        }
      },

      {
        $addFields: {
          products: {
            $mergeObjects: [ 
              { $arrayElemAt: [ "$productData", 0 ] }, "$products" 
            ]
          }
        }
      },

      // filter needed fields
      {
        $project: {
          _id: 1, user_id: 1, total_quantity: 1, total_price: 1, paid_amount: 1,
          status: 1, order_at: 1, paid_at: 1, deliver_address: 1,
          products: 1
        }
      },

      {
        $group: {
          _id: '$_id',
          products: { $push: '$products' },

          user_id: { $first: '$user_id' },
          total_quantity: { $first: '$total_quantity' },
          total_price: { $first: '$total_price' },
          paid_amount: { $first: '$paid_amount' },
          status: { $first: '$status' },
          order_at: { $first: '$order_at' },
          paid_at: { $first: '$paid_at' },
          deliver_address: { $first: '$deliver_address' }

        }

      }

    ]);

    if(!orderDetail[0] ) {
      throw new Error('Order not found');
    }

    return NextResponse.json(orderDetail[0]);

  }
  catch (err) {

    return error_response(err);

  }

}