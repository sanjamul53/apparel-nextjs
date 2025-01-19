import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Products } from '@/apiServer/models/product.model';
import { dashboard_api_primary_byCategory_query_item as query_items } 
from '@/dashboard/primary_page/byCategories';


const doc_project = {
  _id: 1, name: 1, price: 1, offer: 1, image_variation: 1,
  brand: 1
}


export async function fetchSummaryData( ) {

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

    const resData = {
      ...productData[0],
      offerData: offerData
    }


    return JSON.parse(JSON.stringify(resData));

  }
  catch (e) {

    return null;

  }

}