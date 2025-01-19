import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { error_response } from '@/apiServer/controller/err_res';
import { is_object } from '@/apiServer/functions/is_object';
import { isValidObjectId } from '@/apiServer/functions/isValidObjectId';
import { is_integer } from '@/apiServer/functions/is_integer';
import { Products } from '@/apiServer/models/product.model';
import { stringToObjectId } from '@/apiServer/functions/stringToObjectId';
import { Orders, ty_order_product_item, ty_order_product_variation_item } 
from '@/apiServer/models/order.model.';
import { auth_guard } from '@/apiServer/controller/auth/auth_guard';



interface T_create_order_param {

  deliver_address?: string;

  products: {
    [product_id: string]: {
      [variation_id: string]: number;
    }
  }

}

export async function POST(request: NextRequest) {

  try {

    // ========================== check auth ==========================

    const authData =  await auth_guard();

    // ========================== check req body ==========================
    const reqBody = await request.json() as T_create_order_param;


    // ====================================================================
    // ========================== check products ==========================
    if(
      !reqBody.products || !is_object(reqBody.products) || 
      Object.keys(reqBody.products).length < 1
    ) {
      throw new Error('products are missing');
    }

    let total_productAmount = 0;
    let is_invalidProduct = false;

    const productId_list = Object.keys(reqBody.products);
    // get all vairations
    let all_variationID_list = {};

    for(let i=0; i < productId_list.length; i++) {

      const prodId = productId_list[i];

      // check productId is objectID
      if(!isValidObjectId(prodId)) {
        is_invalidProduct = true;
        break;
      }

      const currentProduct = reqBody.products[prodId];

      // check currentProduct is object
      if(!is_object(currentProduct)) {
        is_invalidProduct = true;
        break;
      }

      // ======================== check variations ========================
      const prodVariation_list = Object.keys(currentProduct);

      if(prodVariation_list.length < 1) {
        is_invalidProduct = true;
        break;
      }

      let is_invalid_variation = false;

      for(let j=0; j < prodVariation_list.length; j++) {

        const variation_id = prodVariation_list[j];

        all_variationID_list = {
          ...all_variationID_list,
          [variation_id]: 1
        }
        total_productAmount = total_productAmount + 1;

        // check variation_id is objectID
        if (!isValidObjectId(variation_id)) {
          is_invalid_variation = true;
          break;
        }

        const currentVariation = currentProduct[variation_id];
        if(!is_integer(currentVariation) || currentVariation < 1) {
          is_invalid_variation = true;
          break;
        }

      }
      // ========================= end of variations
      

      if(is_invalid_variation) {
        is_invalidProduct = true;
        break;
      }


    }
    // ========================== end of checking products ==========================

    if (is_invalidProduct) {
      throw new Error('invalid product');
    }

    if(total_productAmount > 50) {
      throw new Error('Too many products');
    }

    const productObjId_list = Object.keys(reqBody.products).map(el => {
      return stringToObjectId(el);
    })

    const variationObjId_list = Object.keys(all_variationID_list).map(el => {
      return stringToObjectId(el);
    })

    // ========================== start of query ==========================
    await dbConnect();

    const quriedProducts = await Products.aggregate([

      {
        $match: {
          _id: {
            $in: productObjId_list
          }
        }
      },

      {
        $project: {
          _id: 1, offer: 1, variation_list: 1
        }
      },

      {
        $unwind: '$variation_list'
      },

      {
        $match: {
          'variation_list._id': {
            $in: variationObjId_list
          }
        }
      },

      {
        $project: {
          _id: 1,
          variation: {
            id: '$variation_list._id',
            color: '$variation_list.color',
            size: '$variation_list.size',

            price: {
  
              $trunc: [
                {
                  $subtract: [
                    '$variation_list.price',
                    {
                      $divide: [
                        { $multiply: ['$offer', '$variation_list.price'] },
                        100
                      ]
                    }
                  ]
                },
                0
              ]
  
            }

          }
        }
      },

      {
        $group: {
          _id: '$_id',
          variation_list: {
            $push: '$variation'
          }
        }
      }

    ]);

    // ====================== calculate order data ======================

    let orderProductList: ty_order_product_item[] = [];

    let orderTotalQuantity = 0;
    let orderTotalPrice = 0;

    quriedProducts.forEach(prod => {


      const reqProduct = reqBody.products[prod._id];


      let variationList: ty_order_product_variation_item[] = [];

      prod.variation_list.forEach((variation: any) => {

        const variation_quantiity = reqProduct[variation.id];

        const variation_totalPrice = variation.price * variation_quantiity;

        const variationItem: ty_order_product_variation_item = {
          _id: variation.id,
          quantity: variation_quantiity,
          totalPrice: variation_totalPrice,
          color: variation.color,
          size: variation.size
          
        };

        orderTotalQuantity = orderTotalQuantity + variation_quantiity;
        orderTotalPrice = orderTotalPrice + variation_totalPrice;

        variationList.push(variationItem);

      });

      orderProductList.push({
        _id: prod._id,
        variation_list: variationList
      });

    });


    // check if atleast one product is ordering
    if(orderTotalQuantity < 1) {
      throw new Error('No products found');
    }

    // create order
    const created_order = await Orders.create({
      user_id: stringToObjectId(authData._id),
      total_quantity: orderTotalQuantity,
      total_price: orderTotalPrice,
      paid_amount: 0,
      status: 'pending',
      order_at: new Date(),
      paid_at: null,
      deliver_address: 'test address',
      products: orderProductList

    });


    return NextResponse.json({
      status: 'success order',
      order_id: created_order._id
    });


  }
  catch(e) {
    return error_response(e);
  }
}
