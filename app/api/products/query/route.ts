import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Products } from '@/apiServer/models/product.model';
import { filter_query_reqBody } from 
'@/apiServer/controller/products/filter_query_reqBody';
import { error_response } from '@/apiServer/controller/err_res';
import { api_product_paginate_doc_count } from '@/apiServer/data/products.data';
import { is_integer } from '@/apiServer/functions/is_integer';


export async function GET(request: NextRequest) {

  try {

    const searchParams = request.nextUrl.searchParams;

    let { query_obj } = filter_query_reqBody(searchParams);

    // page param
    const page_param = searchParams.get('page');

    // sort param
    const sort_param = searchParams.get('sort');

    // ========= handle page param
    let current_page = 1;

    if(
      page_param && is_integer(page_param) && 
      Number(page_param) > 1 && Number(page_param) < 100
    ) {
      current_page = Number(page_param);
    }

    // ========= handle sort param
    let sort_query: any = null;

    if(sort_param === 'popularity') {
      sort_query = { sort_order: -1 }
    }
    else if(sort_param === 'price_asc') {
      sort_query = { 'price.min': 1 }
    }
    else if(sort_param === 'price_desc') {
      sort_query = { 'price.min': -1 }
    }


    await dbConnect();

    const product_query_list = await Products.aggregate([

      {
        $match: query_obj
      },


      ...(
        sort_query ? 
        [ { $sort: sort_query } ]: 
        []
      ),


      {
        $skip : (current_page-1) * api_product_paginate_doc_count
      },

      {
        $limit: api_product_paginate_doc_count
      },

      {
        $project: {
          _id: 1, name: 1, price: 1, offer: 1,
          image_variation: 1, brand: 1
        }
      }


    ]);

    return NextResponse.json(product_query_list);

  }
  catch (e) {

    return error_response(e);

  }

}