"use client";
// module
import { useEffect, useState } from 'react';
import { is_server } from "@/functions/is_server.func";
// type
import { ty_fetch_status } from '@/types/general.type';
import { ty_cart_item, ty_cart_list, ty_cart_variation_item } from '@/types/cart.type';
import { is_integer } from '@/functions/is_integer.func';
import { ssactive_img } from '@/functions/ssactive_img.func';


type T_update_item_amount = {
  productId: string;
  variationId: string;
  quantity: number;
}

type T_remove_cart_item_param = {
  productId: string;
  variationId?: string;
}

type T_check_item_param = {
  productId: string;
  variationId: string;
}

export interface ty_handle_selected_item {
  type: 'predefined' | 'custom'
  idx: string;
}

interface T_add_cart_item_param {
  productId: string;
  variationId: string;
  product_name: string;
  product_img: string;
  brand: string;
  size: string;
  color: string;
  variation_img: string;
  variation_price: number;
  quantity: number;
}



export const CART_KEY = 'appreal_storage';


const default_data: ty_cart_list = {}

const get_ls_data = (): ty_cart_list => {

  if (is_server) return default_data;

  // get from local storage
  const getData = localStorage.getItem(CART_KEY);

  if (!getData) return default_data;

  return JSON.parse(getData);

}

// https://stackoverflow.com/questions/56660153
const set_ls_data = (cartData: ty_cart_list) => {

  if (is_server) return null;

  localStorage.setItem(CART_KEY, JSON.stringify(cartData));
  window.dispatchEvent(new Event("storage"));

}


export const useCart = () => {

  const [status, setStatus] = useState<ty_fetch_status>('loading');

  const [cartList, setCartList] = useState<ty_cart_list>({});

  // const [selectedItem, setSelectedItem] = useState<ty_selected_cart_item>({});

  useEffect(() => {

    const cartData = get_ls_data();

    setCartList({ ...cartData });
    setStatus('success');

  }, []);

  // =========================== add on local storage ===========================
  useEffect(() => {

    if (status === 'success') {

      set_ls_data(cartList);

    }

  }, [status, cartList]);



  // =========================== add cart item ===========================
  const add_cart_item = (param: T_add_cart_item_param): any => {

    if (param.quantity < 1) return null;

    let variation_img_src = ssactive_img({ src: param.variation_img, size: 'xs'  })

    // all time get modified data
    let cartData = get_ls_data();

    // ======== if product already exist
    if(cartData.hasOwnProperty(param.productId)) {

      let targetProduct = cartData[param.productId];

      // --------- if variation already exist
      if(targetProduct.variation_list.hasOwnProperty(param.variationId)) {
        return null;
      }
      // --------- if variation not exist
      targetProduct = {
        ...targetProduct,
        variation_list: {
          ...targetProduct.variation_list,
          [param.variationId]: {
            _id: param.variationId,
            size: param.size,
            color: param.color,
            img: variation_img_src,
            quantity: param.quantity,
            price_single: param.variation_price
          }
        }
      }

      cartData = {
        ...cartData,
        [param.productId]: {...targetProduct}
      }

    } 
    // ======== if product not exist
    else {


      let prod_img_src = ssactive_img({ src: param.product_img, size: 'xs' });


      cartData = {
        ...cartData,
        [param.productId]: {
          _id: param.productId,
          name: param.product_name,
          primary_img: prod_img_src,
          brand: param.brand,
          variation_list: {
            [param.variationId]: {
              _id: param.variationId,
              size: param.size,
              color: param.color,
              img: variation_img_src,
              quantity: param.quantity,
              price_single: param.variation_price
            }
          }
        }
      }
    }

    setCartList({ ...cartData });
    
  }

  // =========================== remove cart item ===========================
  const remove_cart_item = (param: T_remove_cart_item_param): any => {

    const { productId, variationId } = param;

    // all time get modified data
    let cartData = get_ls_data();

    // get current item
    const targetItem = cartData[productId];

    // if target item is not exist
    if (!targetItem) return null;

    // =========== if variationId is missing or just one variaion left,
    // then remove the whole product ===========
    if (!variationId || Object.keys(targetItem.variation_list).length <= 1) {

      let newList: ty_cart_list = {};

      // remove the target item
      Object.keys(cartData).forEach(el => {

        if (el !== productId) {
          newList = {
            ...newList,
            [el]: { ...cartData[el] }
          }
        }

      })

      setCartList({ ...newList });
      return null;
    }
    // =========== If variation_id is provied,
    // then remove only the variation ===========
    else {

      let new_vairiationList: typeof targetItem.variation_list = {};

      // remove the target variation
      Object.keys(targetItem.variation_list).forEach(el => {

        if (el !== variationId) {
          new_vairiationList = {
            ...new_vairiationList,
            [el]: { ...targetItem.variation_list[el] }
          }
        }

      });

      cartData = {
        ...cartData,
        [productId]: {
          ...targetItem,
          variation_list: {...new_vairiationList}
        }
      };

      setCartList({ ...cartData });

    }



  }

  // =========================== update cart item amount ===========================
  const update_item_amount = (param: T_update_item_amount): any => {

    if(!is_integer(param.quantity) || param.quantity < 1) return null;

    // all time get modified data
    let cartData = get_ls_data();

    // get current item
    let targetProduct = cartData[param.productId];

    // if target product is not exist
    if (!targetProduct) return null;

    
    // if target variation is not exist
    if(!targetProduct.variation_list.hasOwnProperty(param.variationId)) return null;

    const targetVariation = targetProduct.variation_list[param.variationId];

    targetProduct = {
      ...targetProduct,
      variation_list: {
        ...targetProduct.variation_list,
        [param.variationId]: {
          ...targetVariation,
          quantity: param.quantity
        }
      }
    }

    cartData = {
      ...cartData,
      [param.productId]: {...targetProduct}
    }

    setCartList({ ...cartData });
  }

  // =========================== check one item on the cartList ===========================
  const check_variation_item = (param: T_check_item_param): 
  ty_cart_variation_item|null => {

    const { productId, variationId } = param;

    const cartData = get_ls_data();

    if(!cartData.hasOwnProperty(productId)) return null;

    const targetProduct = cartData[productId];

    if(!targetProduct.variation_list.hasOwnProperty(variationId)) return null;

    return targetProduct.variation_list[variationId];
  }

  return {
    cartList, status, add_cart_item, remove_cart_item, 
    update_item_amount, check_variation_item
  }


};