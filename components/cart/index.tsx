// module
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '@/context/cartContext';
// comp
import { Cart_ItemList } from './itemList';
import { Cart_Summary } from './summary';
import { Section } from '../shared/section';
import { Typo } from '../shared/typography';
import { Spinner_Page } from '../shared/spinner/page';
// type
import { ty_selected_cart_list } from '@/types/cart.type';
// style
import classes from '@/styles/cart/cart.module.css';
import { NextImage } from '../shared/nextImage';


export const Cart_Comp = () => {

  const [selectedList, setSelectedList] = useState<ty_selected_cart_list>({});
  const { cartList, status } = useContext(CartContext);

  useEffect(() => {

    let newList: ty_selected_cart_list = {};

    Object.keys(cartList).forEach(el => {

      newList = {
        ...newList,
        [el]: true
      }

    });

    setSelectedList({ ...newList });

  }, [status]);


  if (status === 'loading') {
    return <Spinner_Page />
  }

  // =============== empty cart ===============
  if (Object.keys(cartList).length === 0) {

    return (
      <Section>

        <div className={classes.empty_root}>


          <Typo txt="Your cart is empty"
            variant="h4" align="center"
          />

          <div className={classes.empty_img_div}>

            <NextImage src="/images/cart/empty_cart.svg" alt="empty cart"
              width={600} height={450}
            />

          </div>

        </div>

      </Section>
    )

  }

  return (
    <Section>

      <div className={classes.root} >

        <div className={classes.cartList_div}>
          <Cart_ItemList
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </div>

        <div className={classes.summary_div}>
          <Cart_Summary selectedList={selectedList} />
        </div>

      </div>

    </Section>
  )
};