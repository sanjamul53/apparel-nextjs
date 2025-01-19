import { FC } from 'react';
import { ty_product_cart_item } from '@/types/products.type';
import { Cart_Item } from '@/components/products/cart_item';
import { PartSection } from '.';
// style
import classes_product from '@/styles/dashboard/order_detail/products.module.css';
import classes_variation from '@/styles/dashboard/order_detail/variation.module.css';

interface IComp {
  products: ty_product_cart_item[];
}

export const OrderDetails_Products: FC<IComp> = ({ products }) => {

  return (
    <PartSection title="Ordered Products" >

      {
        products.map(prod => <Cart_Item
          key={prod._id} product={prod} type="order"
          class_product={classes_product} class_variant={classes_variation}
        />
        )
      }
    </PartSection>
  )

};