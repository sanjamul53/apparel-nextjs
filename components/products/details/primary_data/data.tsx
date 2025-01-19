import { useState, useEffect, FC, Dispatch, SetStateAction } from 'react';
// comp
import { Rating } from './data_comp/rating';
import { Typo } from '@/components/shared/typography';
import { Variations } from './data_comp/variations';
import { Price_Comp } from './data_comp/price';
import { Cart_Handler } from './data_comp/cart_handler';
import { Social_Share } from './data_comp/social_share';
// types
import { ty_product_one_detail } from '@/types/products.type';
// style
import classes from '@/styles/products/details/primary_data/product_data.module.css';
import { Additional_Data } from './data_comp/additional_data';


// const variation_test: ty_product_one_detail_variation_item[] = [
//   {
//     color: 'Red',
//     color_hex: '#FF0000',
//     size: 'S',
//     price: 100
//   },
//   {
//     color: 'Red',
//     color_hex: '#FF0000',
//     size: 'M',
//     price: 100
//   },

//   {
//     color: 'Green',
//     color_hex: '#008000',
//     size: 'M',
//     price: 100
//   },
//   {
//     color: 'Green',
//     color_hex: '#008000',
//     size: 'L',
//     price: 100
//   },

//   {
//     color: 'Black',
//     color_hex: '#000000',
//     size: 'XXL',
//     price: 100
//   },

// ]

interface IComp {
  product: ty_product_one_detail;
  setCurrent_img: Dispatch<SetStateAction<string>>;
  setImg_list: Dispatch<SetStateAction<string[]>>;
  default_color: TL_selected_color|null;
  current_img: string;
}

export type TL_selected_color =  { name: string; hex: string; };

export const Product_Data: FC<IComp> = ({ 
  product, setCurrent_img, setImg_list, default_color, current_img
}) => {

  const [current_variation, setCurrent_variation] = 
  useState<string|null>(null);

  const [selected_color, setSelected_color] = 
  useState<TL_selected_color|null>(default_color);
  const [selected_size, setSelected_size] = useState<string|null>(null);

  const [current_price, setCurrent_price] = useState<number|null>(null);



  // ================= handle selected_color for image_list =================
  useEffect(() => {

    if(!selected_color) {
      setImg_list([product.image_primary]);
      setCurrent_img(product.image_primary);
      return;
    };

    let img_list_obj: {[key: string]: number} = {};

    product.variation_list.forEach(el => {

      if(
        el.color_hex === selected_color.hex && 
        el.color === selected_color.name
      ) {

        img_list_obj = {
          ...img_list_obj,
          ...(el.front_image && {[el.front_image]: 1}),
          ...(el.back_image && {[el.back_image]: 1}),
          ...(el.side_image && {[el.side_image]: 1})
        }

      }

    });

    let img_list = Object.keys(img_list_obj).map(el => el);
    img_list.push(product.image_primary);

    setImg_list([...img_list]);
    setCurrent_img(img_list[0]);

  }, [selected_color]);


  // ================= handle current_variation and price =================
  useEffect(() => {

    if(!selected_color || !selected_size) {
      setCurrent_variation(null);
      setCurrent_price(null);
      return;
    }

    // find target variation item
    const target_variation = product.variation_list
    .find(el => (el.color_hex === selected_color.hex && el.size === selected_size) );

    if(!target_variation) {
      setCurrent_variation(null);
      setCurrent_price(null);
    }
    else {
      setCurrent_variation(target_variation._id);
      setCurrent_price(target_variation.price);
    }


  }, [selected_color, selected_size]);


  

  return (
    <div className={classes.root}>

      <Typo
        txt={product.name.toUpperCase()}
        variant="h4" weight={400}
        color="var(--color_blue_black)"
      />

      <Typo
        txt={`Brand: ${product.brand}`}
        variant="h5"  weight={400}
        margin="1rem 0 0 0"
      />

      {/* <Typo
        txt={`Style: ${product.styleName}`}
        size="1.7rem"
        margin="1.2rem 0 0 0"
      /> */}

      <Rating 
        rating_quantity={product.rating_quantity}
        rating_sum={product.rating_sum}
      />


      {
        product.variation_list.length > 0 &&
        <Variations
          list={product.variation_list}
          selected_color={selected_color}
          selected_size={selected_size}
          setSelected_color={setSelected_color}
          setSelected_size={setSelected_size}
        />
      }

      <Price_Comp
        value={current_price}
        primary_value={product.price}
        offer={product.offer}
      />


      <Cart_Handler
        is_disable={
          (selected_color && selected_size) ? false : true
        }
        current_vairation_id={current_variation}
        selected_color={selected_color?.name || null}
        selected_size={selected_size}
        current_price={current_price}
        current_img={current_img}
        product={product}
      />


      <Additional_Data />

      <Social_Share />

    </div>
  )

};