import fetch from 'node-fetch';

const api_pass = '501020:8b3e8526-3b6c-4fe8-b1b6-2f5e13f82d67';

type T_param = {
  brandName: string;
  styleName: string;
}

export const fetchData = async ({brandName, styleName}: T_param) => {

  try {

    // fetch style data
    const style_data_fetch =  await fetch(
      `https://api.ssactivewear.com/v2/styles?search=${brandName} ${styleName}`, {
        method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa(api_pass)}
      }
    );

    if(!style_data_fetch.ok) {
      throw new Error('failed to get data');
    }

    const style_data_res: any = await style_data_fetch.json();

    if(!style_data_res[0]) {
      throw new Error('failed to get data');
    };

    const style_data = style_data_res[0];


    // check brand name contain + (example: BELLA + CANVAS)
    let brandName_modified = brandName;
    if(brandName.includes(' + ')) {
      brandName_modified = brandName.replace(" + ", "%20%2B%20");
    }


    // fetch product data
    const product_data_fetch =  await fetch(
      `https://api.ssactivewear.com/v2/products?style=${brandName_modified} ${styleName}&fields=colorName,colorFamily,colorFrontImage,colorBackImage,colorSideImage,colorDirectSideImage,color1,sizeName,sizeOrder,piecePrice`, {
        method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa(api_pass)}
      }
    );

    if(!product_data_fetch.ok) {
      throw new Error('failed to get data');
    }

    const variation_data: any = await product_data_fetch.json();

    if(variation_data.length < 1) {
      throw new Error('failed to get data');
    };

    return {
      style_data,
      variation_data
    }

  }
  catch(err) {
    return null;
  }

}