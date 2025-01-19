"use client";
import { useState, useEffect } from 'react';
import { is_server } from "@/functions/is_server.func";
import { ty_selected_cart_list } from '@/types/cart.type';
import { ty_fetch_status } from '@/types/general.type';


type T_update_item_amount = {
  productId: string;
  variationId: string;
  quantity: number;
}



interface T_order_data {

  summaryData: {
    price: number;
    quantity: number;
  };

  selectedList: ty_selected_cart_list;

}



const ORDER_KEY = 'appreal_order';



export const useOrder = () => {

  const [orderSummary, setOrderSummary] = useState<T_order_data|null>(null);
  const [status, setStatus] = useState<ty_fetch_status>('loading');


  useEffect(() => {

    // get from local storage
    const getSessionData = sessionStorage.getItem(ORDER_KEY);

    if (getSessionData) {

      const data = JSON.parse(getSessionData) as T_order_data;
      setOrderSummary({...data});
    }
  
    setStatus('success');

  },[]);


  const set_data = (orderData: T_order_data) => {

    if (is_server) return null;
  
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(orderData));
  
  }



  return {
    set_order_data: set_data, orderSummary, orderStatus: status
  }


};