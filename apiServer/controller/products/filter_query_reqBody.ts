import { is_integer } from '@/functions/is_integer.func';

export const filter_query_reqBody = (params: URLSearchParams) => {

  const baseCategory_param = params.get('baseCategory');
  const brand_param = params.get('brand');
  let sale_param = params.get('sale');
  // get feature_list
  const sleeve_length_param = params.get('sleeve_length');
  const feature_param = params.get('feature');
  const collar_param = params.get('collar');
  const fit_param = params.get('fit');
  const thickness_param = params.get('thickness');
  const color_param = params.get('color');
  const size_param = params.get('size');
  const type_param = params.get('type');

  // =========== check baseCategory
  if (!baseCategory_param) {
    throw new Error('invalid baseCategory');
  }

  let query_obj: { [key: string]: any } = {
    baseCategory: baseCategory_param
  }

  let color_size_queryObj: any[] = [];

  // =========== handle brand
  if (brand_param) {
    query_obj = {
      ...query_obj,
      brand: brand_param
    }
  }

  // =========== add query for sale_param
  if (sale_param) {

    if (sale_param === 'only_sale') {
      query_obj = {
        ...query_obj,
        offer: { $gt: 0 }
      }
    }
    else if (sale_param === 'without_sale') {
      query_obj = {
        ...query_obj,
        offer: 0
      }
    }
  }


  // =========== handle sub_list
  let sub_list_param: number[] = [];

  // check type
  if (type_param && is_integer(type_param)) {
    sub_list_param.push(Number(type_param));
  }

  // check sleeve_length
  if (sleeve_length_param && is_integer(sleeve_length_param)) {
    sub_list_param.push(Number(sleeve_length_param));
  }

  // check feature
  if (feature_param && is_integer(feature_param)) {
    sub_list_param.push(Number(feature_param));
  }

  // check collar
  if (collar_param && is_integer(collar_param)) {
    sub_list_param.push(Number(collar_param));
  }

  // check fit
  if (fit_param && is_integer(fit_param)) {
    sub_list_param.push(Number(fit_param));
  }

  // check thickness
  if (thickness_param && is_integer(thickness_param)) {
    sub_list_param.push(Number(thickness_param));
  }

  if (sub_list_param.length > 0) {

    query_obj = {
      ...query_obj,
      sub_list: {
        $all: sub_list_param
      }
    }

  }

  // =========== handle color
  if (color_param) {

    color_size_queryObj = [
      ...color_size_queryObj,
      {
        $elemMatch: { type: 'color', name: color_param }
      },
    ];

  }

  // =========== handle size
  if (size_param) {

    color_size_queryObj = [
      ...color_size_queryObj,
      {
        $elemMatch: { type: 'size', name: size_param }
      },
    ];

  }

  if (color_size_queryObj.length > 0) {
    query_obj = {
      ...query_obj,
      colorFamily_size_list: {
        $all: color_size_queryObj
      }
    }
  }


  // =========== check color_family
  // let color_family: string[] = [];

  // if (reqBody.color_family && Array.isArray(reqBody.color_family)) {

  //   reqBody.color_family.forEach((el: any) => {
  //     if (typeof el === 'string') {
  //       color_family.push(el);
  //     }
  //   })

  // }

  // if (color_family.length > 0) {

  //   query_obj = {
  //     ...query_obj,
  //     color_family
  //   }

  // }


  // =========== check sizes
  // let sizes: string[] = [];

  // if (reqBody.sizes && Array.isArray(reqBody.sizes)) {

  //   reqBody.sizes.forEach((el: any) => {
  //     if (typeof el === 'string') {
  //       sizes.push(el);
  //     }
  //   })

  // }

  // if (sizes.length > 0) {

  //   query_obj = {
  //     ...query_obj,
  //     sizes
  //   }

  // }

  return {
    query_obj
  }

}