import { auth_guard } from '@/apiServer/controller/auth/auth_guard';
import { error_response } from '@/apiServer/controller/err_res';
import { api_order_paginate_doc_count } from '@/apiServer/data/orders.data';
import { is_integer } from '@/apiServer/functions/is_integer';
import { stringToObjectId } from '@/apiServer/functions/stringToObjectId';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Orders } from '@/apiServer/models/order.model.';
import { NextResponse, NextRequest } from 'next/server';

const test_uid = '656feea91f6f7648a03470b2';

export async function GET(request: NextRequest) {

  try {

    // check auth
    const authData = await auth_guard();

    const searchParams = request.nextUrl.searchParams;


    // page param
    const page_param = searchParams.get('page');

    let current_page = 1;

    if(
      page_param && is_integer(page_param) && 
      Number(page_param) > 1 && Number(page_param) < 100
    ) {
      current_page = Number(page_param);
    }

    await dbConnect();

    const orders = await Orders.find(
      {
        user_id: stringToObjectId(authData._id)
      },
      {
        _id: 1, total_quantity: 1, total_price: 1, status: 1, order_at: 1
      }
    )
    .sort( { order_at: -1 } )
    .skip((current_page-1)*api_order_paginate_doc_count)
    .limit(api_order_paginate_doc_count)
    .lean();

    return NextResponse.json(orders);

  }
  catch (err) {

    return error_response(err);

  }

}