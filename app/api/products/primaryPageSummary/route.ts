import { NextResponse } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Products } from '@/apiServer/models/product.model';
import { dashboard_api_primary_byCategory_query_item as query_items } 
from '@/dashboard/primary_page/byCategories';
import { error_response } from '@/apiServer/controller/err_res';


const doc_project = {
  _id: 1, name: 1, price: 1, offer: 1, image_variation: 1,
  brand: 1
}



export async function GET( ) {

  try {

    await dbConnect();


    let query: any = {};

    query_items.forEach(el => {
  
      let currentQuery = {
        ...(el.baseCategory && { baseCategory: el.baseCategory }),
        ...(el.sub_list && { sub_list: el.sub_list }),
      };
  
      query = {
  
        ...query,
  
        [el.section_idx]: [
  
          {
            $match: currentQuery
          },

          {
            $sort: {
              sort_order: -1
            }
          },
  
          {
            $limit: 16
          },

          {
            $project: doc_project
          }
  
        ]
      }
  
  
    });

    // ================== offer data ==================
    const offerData = await Products.aggregate([

      {
        $match: {
          offer: { $gt: 0 }
        }
      },

      {
        $sort: {
          sort_order: -1
        }
      },

      {
        $limit: 20
      },

      {
        $project: {
          _id: 1, name: 1, offer: 1, image_variation: 1,
          offer_title: 1, sale_end_date: 1,
        }
      }

    ]);


    // ================== products data ==================
    const productData = await Products.aggregate([

      {
        $sort: {
          sort_order: -1
        }
      },

      {
        $facet: {
          ...query
        }
      }

    ]);

    return NextResponse.json({
      ...productData[0],
      offerData: offerData
    });

  }
  catch (e) {

    return error_response(e);

  }

}