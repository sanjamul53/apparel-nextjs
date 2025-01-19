import { NextResponse, NextRequest } from 'next/server';
import { dbConnect } from '@/apiServer/libs/mongoose/connect';
import { Products } from '@/apiServer/models/product.model';
import { error_response } from '@/apiServer/controller/err_res';
import { getRandomNumber } from '@/functions/getRandomNumber.func';


export async function GET(request: NextRequest ) {

  try {

    await dbConnect();


    // await Products.create({
    //   name: 'test',
    //   price: { min: 5, max: 10 },
    //   offer: 10,
    //   image_primary: 'img',
    //   image_variation: 'img',
    //   brand: 'test',
    //   styleName: 'test style',
    //   colorFamily_size_list: [],
    //   baseCategory: 't_shirt',
    //   sub_list: [5],
    //   variation_list: []
    // });

    // return NextResponse.json({status: 'created'});

    const productList = await Products.find({}).limit(10);
   
    return NextResponse.json(productList);

  }
  catch (e) {

    return error_response(e);

  }

}