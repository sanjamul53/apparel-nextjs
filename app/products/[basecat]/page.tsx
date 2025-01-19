// module
import { Fetch } from '@/functions/fetch';
import { redirect } from 'next/navigation';
// data
import { product_baseCategory_List } from '@/data/product/categories';
import { Product_PAGE_PARAM, Product_SORT_PARAM, accepted_params_filter } 
from './page_data';
// comp
import { Client_Contnet } from './client_contnet';
// types
import { ty_page_params, ty_page_url } from '@/types/general.type';
import { ty_product_filter_data_list, ty_product_item } 
from '@/types/products.type';

interface T_fetch_filter {
  basecat: string;
  searchParams: ty_page_params;
}

const accepted_params_product = [
  ...accepted_params_filter,
  Product_SORT_PARAM, Product_PAGE_PARAM
];

const fetch_product_data = async ({basecat, searchParams}: T_fetch_filter) => {
  try {

    // create parameter string
    let param_str = `baseCategory=${basecat}&`;

    Object.keys(searchParams).forEach(el => {
  
      if(accepted_params_product.includes(el)) {
        param_str = `${param_str}${el}=${searchParams[el]}&`;
      }
  
    });

    const fetch_res = await Fetch<ty_product_item[]>({
      url: `/products/query?${param_str}`,
      methodType: 'GET'
    })

    return fetch_res;

  }
  catch (err) {
    return null;
  }
}

const fetch_dynamic_filter_data = async ({basecat, searchParams}: T_fetch_filter) => {
  try {

    // create parameter string
    let param_str = `baseCategory=${basecat}&`;

    Object.keys(searchParams).forEach((el: any) => {
  
      if(accepted_params_filter.includes(el)) {
        param_str = `${param_str}${el}=${searchParams[el]}&`;
      }
  
    });

    const fetch_res = await Fetch<ty_product_filter_data_list>({
      url: `/products/dynamic_filter?${param_str}`,
      methodType: 'GET'
    })

    return fetch_res;

  }
  catch (err) {
    return null;
  }
}


export default async function ProductPage({ params, searchParams }: ty_page_url) {

  const baseCat = params.basecat;


  // check for valid basecategory
  if(!product_baseCategory_List.includes(baseCat)) {
    redirect('/');
    return null;
  }

  const product_list = await fetch_product_data({
    basecat: baseCat, searchParams
  });

  const filter_data = await fetch_dynamic_filter_data({
    basecat: baseCat, searchParams
  });

  if(!product_list || !filter_data) return null;

  return <Client_Contnet
    basecat={baseCat}
    searchParams={searchParams}
    filter_data={filter_data}
    product_list={product_list}
  />


}