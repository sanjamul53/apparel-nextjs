import { NextResponse, type NextRequest } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Products } from '@/apiServer/models/product.model';
import { ty_api_get_options } from '@/apiServer/types/general.type';
import { error_response } from '@/apiServer/controller/err_res';



export async function GET(request: NextRequest, { params }: ty_api_get_options ) {

  try {

    if(!params['id']) {
      throw new Error('invalid request');
    }

    const product_id = params['id'] as string;


    await dbConnect();

    const target_product = await Products.findOne(
      { _id: product_id },
      {
        _id: 1, name: 1, price: 1, offer: 1, 
        image_primary: 1, image_variation: 1, brand: 1,
        styleName: 1, baseCategory: 1, sub_list: 1, 
        total_sold: 1, rating_sum: 1, rating_quantity: 1, 
        description: 1, variation_list: 1
      }
    );

    if(!target_product) {
      throw new Error('Product not found');
    }

    const similar_products = await Products.aggregate([

      {
        $match: {
          baseCategory: target_product.baseCategory,
          sub_list: {
            $in: target_product.sub_list
          }
        }
      },
      {
        $sort: {
          sort_order: -1
        }
      },
      {
        $limit: 4
      },
      {
        $project: {
          _id: 1, name: 1, price: 1, offer: 1,
          image_variation: 1, brand: 1
        }
      }

    ]);

    return NextResponse.json({
      target_product: target_product,
      similar_products
    });

  }
  catch (e) {

    return error_response(e);

  }

}