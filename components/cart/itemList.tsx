// module
import { useContext,  FC, Fragment, Dispatch, SetStateAction } from 'react';
import { CartContext } from '@/context/cartContext';
import { ty_selected_cart_list } from '@/types/cart.type';
import { Cart_Item } from '@/components/products/cart_item';

// style
import class_cart from '@/styles/cart/itemList/item_product.module.css';
import class_variant from '@/styles/cart/itemList/variation_item.module.css';

interface IComp {
  selectedList: ty_selected_cart_list;
  setSelectedList: Dispatch<SetStateAction<ty_selected_cart_list>>;
}

export const Cart_ItemList: FC<IComp> = ({ selectedList, setSelectedList }) => {

  const cartCtx = useContext(CartContext);

  return (
    <Fragment>
      {
        Object.keys(cartCtx.cartList).map(el => {

          const cartProduct = cartCtx.cartList[el];

          return (
            <Cart_Item 
              key={el} type="cart"
              cartCtx={cartCtx}
              product={{
                ...cartProduct, 
                variation_list: Object.values(cartProduct.variation_list)
              }}
              selectedList={selectedList}
              setSelectedList={setSelectedList}

              class_product={class_cart}
              class_variant={class_variant}

            />

          )

        })
      }
    </Fragment>
  )

};