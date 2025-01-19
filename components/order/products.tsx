// module
import { FC } from 'react';
// comp
import { Section } from '../shared/section';
import { Cart_Item } from '../products/cart_item';
import { Section_Title } from './shared';
// type
import { ty_cart_item } from '@/types/cart.type';
// style
import classes from '@/styles/order/products.module.css';
import class_product from '@/styles/order/cart_product/product.module.css';
import class_variation from '@/styles/order/cart_product/variation.module.css';
import { Typo } from '../shared/typography';

interface IComp {
  products: ty_cart_item[];
  summary: {
    price: number;
    quantity: number;
  };
}

export const Order_Products: FC<IComp> = ({ products, summary }) => {

  const summaryData = [
    { label: 'Total Items', value: summary.quantity },
    { label: 'Total Price', value: `$${summary.price}` }
  ];


  return (
    <Section>

      <Section_Title title="Ordered Products" />

      <div className={classes.root}>

        {
          products.map(el => <Cart_Item
            key={el._id} type="order"
            product={{ ...el, variation_list: Object.values(el.variation_list) }}
            class_product={class_product} class_variant={class_variation}
          />
          )
        }



        {/* ======================= summary data list ======================= */}
        <div className={classes.summaryList}>

          {
            summaryData.map(el => (
              <div key={el.label} className={classes.summary_item}>

                <Typo txt={`${el.label}:`} size="2rem"
                  weight={400}
                />

                <Typo txt={el.value} size="2rem"
                  weight={500}
                />

              </div>
            ))
          }

        </div>

      </div>


    </Section>
  )

};