import { promises as fs } from 'fs';
import { ROOT_PATH } from '../../app';
import { fetchData } from './fetch_data';
import { generate_data } from './generate_data';
import { productModel } from '../../schema/productModel';


export const insert_data = async () => {

  try {

    // console.log(' =============================');

    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });


    // get current style
    const style_list_json = await fs.readFile(
      `${ROOT_PATH}/static_data/style_list.json`, 'utf8'
    );
    const style_list: any = JSON.parse(style_list_json);

    // console.log('after read style file');


    if(style_list.length < 1) {
      throw new Error('insert completed');
    }

    const current_style = style_list[style_list.length-1];


    const style_brand_name = 
    `${current_style.brandName} - ${current_style.styleName}`;

    // fetch style and variation data
    const fetch_data = await fetchData({ 
      brandName: current_style.brandName, 
      styleName: current_style.styleName 
    });

    // console.log('after fetching');


    if(!fetch_data) {
      throw new Error(`failed to fetch data: ${style_brand_name}`);
    }


    const generatedData = generate_data({...fetch_data});
    if(!generatedData) {
      throw new Error(`failed to generate data: ${style_brand_name}`);
    }

    const { product_data } = generatedData;

    // save to db
    await productModel.create(product_data);

    console.log(`
      ${style_brand_name} completed, ${style_list.length} item remains
    `);

  }
  catch(err:any) {
    console.log(err.message)
    // console.log('catch block');
  }
  finally {

    // console.log('finally block');

    // get current style
    const style_list_json = await fs.readFile(
      `${ROOT_PATH}/static_data/style_list.json`, 'utf8'
    );
    const style_list: any = JSON.parse(style_list_json);

    // remove last item
    style_list.pop();

    // save to json
    await fs.writeFile(
      `${ROOT_PATH}/static_data/style_list.json`,
      JSON.stringify(style_list)
    );

    if(style_list.length > 0) {
      insert_data();
    }

  }

}


/*

      Gildan - 18500 completed, 9 item remains
    
      Gildan - 18000B completed, 5 item remains
    

      Gildan - 18000 completed, 4 item remains
    

      Gildan - 12500 completed, 3 item remains
    
failed to generate data: Gildan - 12300

      Gildan - 12000 completed, 1 item remains


*/



// https://api.ssactivewear.com/v2/products/?style=bella%20%2B%20canvas 6008

// %20%2B%20