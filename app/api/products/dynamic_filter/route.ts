import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Products } from '@/apiServer/models/product.model';
import { filter_query_reqBody } from 
'@/apiServer/controller/products/filter_query_reqBody';
import { error_response } from '@/apiServer/controller/err_res';


export async function GET(request: NextRequest) {

  try {

    const searchParams = request.nextUrl.searchParams;

    const { query_obj } = filter_query_reqBody(searchParams);

    await dbConnect();


    const product_query_list = await Products.aggregate([

      {
        $match: query_obj
      },

      {
        $project: {
          sub_list: 1, brand: 1, colorFamily_size_list: 1, sizes: 1
        }
      },


      {
        $facet: {

          // ========================= additional =========================
          additional: [

            {
              $group: {
                _id: null,
                total: { $sum: 1 }
              }
            }

          ],

          // // ========================= handle colors =========================
          // color_family: [
          //   {
          //     $unwind: '$colorFamily_size_list'
          //   },
          //   {
          //     $match: {
          //       'colorFamily_size_list.type': 'color'
          //     }
          //   },
          //   {
          //     $group: {
          //       _id: '$colorFamily_size_list.name',
          //       total: { $sum: 1 }
          //     }
          //   },
          //   {
          //     $sort: {
          //       '_id': 1
          //     }
          //   }
          // ],

          // ========================= handle sizes =========================
          sizes: [
            {
              $unwind: '$colorFamily_size_list'
            },
            {
              $match: {
                'colorFamily_size_list.type': 'size'
              }
            },
            {
              $group: {
                _id: '$colorFamily_size_list.name',
                total: { $sum: 1 }
              }
            },
            {
              $sort: {
                '_id': 1
              }
            }
          ],

          // ========================= handle sub_list =========================
          sub_list: [
            {
              $unwind: '$sub_list'
            },

            {
              $group: {
                _id: '$sub_list',
                total: { $sum: 1 }
              }
            }
          ],

          // ========================= handle brand =========================
          brand: [

            {
              $group: {
                _id: '$brand',
                total: { $sum: 1 }
              }
            },

            { 
              $sort : { _id : 1 } 
            }

          ]

        }
      }


    ]);

    return NextResponse.json(product_query_list[0]);

  }
  catch (e) {

    return error_response(e);

  }

}