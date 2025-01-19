"use client";
// module
import { useContext, Fragment } from 'react';
import { CartProvider } from '@/context/cartContext';
// comp
import { Page_Header } from '@/components/shared/page_header';
// types
import { ty_page_header_nav_item } from '@/types/general.type';
import { Cart_Comp } from '@/components/cart';

const nav_list: ty_page_header_nav_item[] = [
  {
    label: 'Cart',
    link: null
  }
]


export default function CartPage() {


  return (
    <Fragment>

      <Page_Header
        title="Your cart" nav_list={nav_list}
      />

      <CartProvider>
        <Cart_Comp />
      </CartProvider>

    </Fragment>
  )

};