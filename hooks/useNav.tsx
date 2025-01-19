import { useState, useEffect } from 'react';
import { ty_fetch_status } from '@/types/general.type';
import { is_server } from '@/functions/is_server.func';
import { CART_KEY as CART_STORAGE_KEY, useCart } from './useCart';
import { ty_cart_list } from '@/types/cart.type';

export const NAV_STORAGE_PREFIX = 'APPREAL_NAV';


interface T_Cart {
  status: ty_fetch_status;
  totalItem: number;
};

interface T_Auth {
  status: ty_fetch_status;
  isSignedIn: boolean;
};


const cartList_to_totalItem = (cartList: ty_cart_list) => {

  let itemCount = 0;

  Object.values(cartList).forEach(prod => {

    Object.values(prod.variation_list).forEach(el => {

      itemCount = itemCount + el.quantity;

    })

  });

  return itemCount;

}

export const useNav = () => {

  const [cart, setCart] = useState<T_Cart>({ status: 'loading', totalItem: 0 });
  const { status: cartStatus, cartList } = useCart();


  // ============================ initial set of Cart ============================
  useEffect(() => {

    if (cartStatus !== 'success') return;

    let totalItem = cartList_to_totalItem(cartList);

    setCart({ status: 'success', totalItem });

  }, [cartStatus, cartList]);

  useEffect(() => {

    window.addEventListener('storage', () => {

      // get cart storage
      const cartStorage = localStorage.getItem(CART_STORAGE_KEY);

      if (cartStorage) {
        const cartData = JSON.parse(cartStorage);
        const totalItem = cartList_to_totalItem(cartData);
        setCart({status: 'success', totalItem})
      }

    });

  }, []);


  return {
    cart
  }


}