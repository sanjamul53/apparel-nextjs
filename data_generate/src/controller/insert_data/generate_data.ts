import { baseCategoryList, feature_list, subBaseCategoryList } 
from '../../data/category';
import { getRandomNumber } from '../../utils/getRandomNumber';


type T_param = {
  style_data: any;
  variation_data: any;
}

type T_colorFamily_size_list = {
  type: 'color'| 'size',
  name: string;
}

export const generate_data = ({style_data, variation_data}: T_param) => {

  // console.log(style_data);

  // ============= generate category data

  // check if baseCategory is exist
  if (!baseCategoryList.hasOwnProperty(style_data.baseCategory)) return null;

  const baseCatItem = baseCategoryList[style_data.baseCategory];

  // get sub category list
  let subCategory_list = {};


  const style_categories = style_data.categories.split(',') as string[];

  // ========== check of subBaseCategoryList

  // handle for Activewear
  if (style_categories.includes('387')) {

    subCategory_list = {
      ...subCategory_list,
      '387': 1
    }

    const sublist = subBaseCategoryList[387];

    style_categories.forEach(el => {
      if (sublist.includes(el)) {
        subCategory_list = {
          ...subCategory_list,
          [el]: 1
        }
      }
    })

  }

  // handle for Womens
  if (style_categories.includes('13')) {

    const baselist = subBaseCategoryList[13];

    if (baselist.includes(style_data.baseCategory)) {

      subCategory_list = {
        ...subCategory_list,
        '13': 1
      }

    }


  }

  // ========== check of sub category
  style_categories.forEach(el => {
    if (baseCatItem.subcat_list.includes(el)) {
      subCategory_list = {
        ...subCategory_list,
        [el]: 1
      }
      // subCategory_list.push(el);
    }
  });

  if (Object.keys(subCategory_list).length < 1) return null;


  // ============= generate product sleeve_length
  let product_sleeve_length: string[] = [];

  style_categories.forEach(el => {

    if (feature_list.sleeve_length.hasOwnProperty(el)) {
      product_sleeve_length.push(el);
    }

  })

  if (product_sleeve_length.length < 1) return null;


  // ============= generate product style
  let product_style: string[] = [];

  style_categories.forEach(el => {

    if (feature_list.style.hasOwnProperty(el)) {
      product_style.push(el);
    }

  })


  // ============= generate product Feature
  let product_feature: string[] = [];

  style_categories.forEach(el => {

    if (feature_list.feature.hasOwnProperty(el)) {
      product_feature.push(el);
    }

  })


  // ============= generate product Collar
  let product_collor: string[] = [];

  style_categories.forEach(el => {

    if (feature_list.collor.hasOwnProperty(el)) {
      product_collor.push(el);
    }

  })


  // ============= generate product fit
  let product_fit: string[] = [];

  style_categories.forEach(el => {

    if (feature_list.fit.hasOwnProperty(el)) {
      product_fit.push(el);
    }

  })

  if (product_fit.length < 1) return null;



  // ============= generate product fit
  let product_thickness: string[] = [];

  style_categories.forEach(el => {

    if (feature_list.thickness.hasOwnProperty(el)) {
      product_thickness.push(el);
    }

  })

  if (product_thickness.length < 1) return null;


  const product_feature_list = [
    ...product_sleeve_length,
    ...product_style,
    ...product_feature,
    ...product_collor,
    ...product_fit,
    ...product_thickness
  ];


  // ============= get the color and size list
  // let color_list = {}; // color list
  let color_family_list = {}; // color family list
  let size_list: { [key: string]: string } = {}; // size list

  variation_data.forEach((item: any) => {

    color_family_list = {
      ...color_family_list,
      [item.colorFamily]: 1
    }

    size_list = {
      ...size_list,
      [item.sizeName]: 1
    }

  })


  let colorFamily_size_list: T_colorFamily_size_list[] = [];

  Object.keys(color_family_list).forEach(el => {

    if(!el) return null;

    colorFamily_size_list.push({
      type: 'color',
      name: el
    })
  });
  
  Object.keys(size_list).forEach(el => {

    if(!el) return null;

    colorFamily_size_list.push({
      type: 'size',
      name: el
    })
  });


  // get one front image from varition, to use an primary image
  let image_variation: null|string = null;

  // ============= generate variaton list
  let variation_list: any[] = [];

  const variation_first_price = Math.floor(variation_data[0].piecePrice * 10);

  let product_price = {
    min: variation_first_price,
    max: variation_first_price
  }

  variation_data.forEach((el: any) => {

    if(!image_variation && el.colorFrontImage) {
      image_variation = el.colorFrontImage;
    }

    const currentItem = {
      color: el.colorName,
      color_hex: el.color1,
      size: el.sizeName,
      price: Math.floor(el.piecePrice * 10),
      front_image: el.colorFrontImage || '',
      back_image: el.colorBackImage || '' , 
      side_image: el.colorSideImage ? el.colorSideImage :
      el.colorDirectSideImage ? el.colorDirectSideImage : ''
    }

    // check max price
    if (currentItem.price > product_price.max) {
      product_price = {
        ...product_price,
        max: currentItem.price
      }
    }


    // check min price
    if (currentItem.price < product_price.min) {
      product_price = {
        ...product_price,
        min: currentItem.price
      }
    }

    variation_list.push(currentItem);

  })

  // if image_variation is not found, then skip this product
  if(!image_variation) {
    return null;
  }

  // ============= generate rating data

  const total_sold = getRandomNumber({ min: 50, max: 1200 });
  const rating_quantity = Math.round(
    total_sold * 
    getRandomNumber({ min: 40, max: 85 }) / 100
  );

  const currentRating = getRandomNumber({ min: 3, max: 5, float: true });
  const rating_sum = Math.round(rating_quantity * currentRating);


  // ============= generate offer data
  let product_offer = 0;
  if (getRandomNumber({ min: 1, max: 10 }) >= 9) {

    product_offer = getRandomNumber({ min: 1, max: 6 });

  }

  // ============= prepare sub list
  let sub_list = {...subCategory_list};
  product_feature_list.forEach(el => {
    sub_list = {
      ...sub_list,
      [el]: 1
    }
  });

  const product_data = {

    name: style_data.title,
    price: product_price,
    offer: product_offer * 5,
    sort_order: 1, // controll on sorting products
    
    image_primary: style_data.styleImage,
    image_variation: image_variation,
    brand: style_data.brandName,
    styleName: style_data.styleName,

    colorFamily_size_list: colorFamily_size_list,


    baseCategory: baseCatItem.name,
    sub_list: Object.keys(sub_list),
    // subcat_list: Object.keys(subCategory_list),
    // feature_list: product_feature_list,

    total_sold: total_sold,
    rating_sum: rating_sum,
    rating_quantity: rating_quantity,
    // description: style_data.description.trim(), // not needed

    variation_list: variation_list

  }

  return {
    product_data,
    // color_list
  }

}