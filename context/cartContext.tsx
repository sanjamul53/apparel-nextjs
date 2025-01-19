import { createContext, FC, ReactNode } from 'react';
import { useCart } from '@/hooks/useCart';
import { ty_cart_list } from '@/types/cart.type';
import { ty_fetch_status } from '@/types/general.type';


type T_remove_cart_item_param = {
  productId: string;
  variationId?: string;
}

type T_update_item_amount = {
  productId: string;
  variationId: string;
  quantity: number;
}

export interface ty_cart_Context {
  cartList: ty_cart_list;
  status: ty_fetch_status;
  remove_cart_item: (param: T_remove_cart_item_param) => any;
  update_item_amount: (param: T_update_item_amount) => any
};

interface IComp {
  children: ReactNode
}


// cart context
export const CartContext = createContext<ty_cart_Context>({
  cartList: {},
  status: 'loading',
  remove_cart_item: () =>{},
  update_item_amount: () => {}
});


// cart context provider
export const CartProvider: FC<IComp> = ({children}) => {

  const { cartList, status, remove_cart_item, update_item_amount } = useCart();


  return (
    <CartContext.Provider
      value={{
        cartList, status, 
        remove_cart_item, update_item_amount
      }}>
      {children}
    </CartContext.Provider>
  )

}