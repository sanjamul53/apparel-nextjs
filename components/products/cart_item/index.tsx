// module
import { useState, useEffect, FC, Dispatch, SetStateAction } from 'react';
import { product_detail_url_generator } from '@/functions/product_detail_url.func';
import { ty_cart_Context } from '@/context/cartContext';
// comp
import { Img } from '@/components/shared/image';
import { Typo } from '@/components/shared/typography';
import { NextLink } from '@/components/shared/link';
import { Variation_Item } from './variation_item';
// icon
import { Icon_Checkbox_Unchecked } from '@/components/icons/checkbox_uncheck';
import { Icon_Checkbox_Checked } from '@/components/icons/checkbox_checked';
import { Icon_Cross_Bold } from '@/components/icons/cross_bold';
// styles
import classes from '@/styles/products/cart_item/cart_item.module.css';
// types
import { ty_selected_cart_list } from '@/types/cart.type';
import { IconButton } from '@/components/shared/button/icon_button';
import { ty_style_class } from '@/types/general.type';
import { cls_join } from '@/functions/cls_join.func';
import { ty_product_cart_item } from '@/types/products.type';


interface IComp {

  type: 'cart'|'order';
  cartCtx?: ty_cart_Context;
  
  product: ty_product_cart_item;

  selectedList?: ty_selected_cart_list;
  setSelectedList?: Dispatch<SetStateAction<ty_selected_cart_list>>;

  class_product: ty_style_class;
  class_variant: ty_style_class;


}

export const Cart_Item: FC<IComp> = ({
  type, cartCtx, product, 
  selectedList, setSelectedList,
  class_product, class_variant
}) => {

  const [totalData, setTotalData] = useState({
    quantity: 0,
    price: 0,
  });


  // ========= calculate totalData
  useEffect(() => {

    let total_quantity = 0;
    let total_price = 0;

    Object.values(product.variation_list).forEach(el => {

      total_quantity = total_quantity + el.quantity;
      total_price = total_price + (el.quantity * el.price_single);

    })

    setTotalData({
      quantity: total_quantity,
      price: total_price,
    });


  }, [product]);

  const product_url = product_detail_url_generator({
    id: product._id, name: product.name
  });


  const selectHanlder = () => {

    if(type !== 'cart' || !selectedList || !setSelectedList) return null;

    // if product not exist
    if (!selectedList.hasOwnProperty(product._id)) {

      setSelectedList({
        ...selectedList,
        [product._id]: true
      })

      return null;
    }

    // if product already exist
    let newList: ty_selected_cart_list = {};
    Object.keys(selectedList).forEach(el => {

      if (el !== product._id) {
        newList = {
          ...newList,
          [el]: true
        }
      }

    })

    setSelectedList({ ...newList });
  }

  // ===============================================================================
  // ==================================== comps ====================================

  const Select_Comp = () => {

    if(type !== 'cart' || !selectedList) return null;

    return (
      <IconButton
      clsName={cls_join([classes.header_checkbox, class_product.header_checkbox])} 
      onClick={selectHanlder}
    >
      {
        selectedList.hasOwnProperty(product._id) ?
          <Icon_Checkbox_Checked scale={0.6} fill="var(--color_slate_blue)" /> :
          <Icon_Checkbox_Unchecked scale={0.6} fill="var(--color_slate_blue)" />
      }
    </IconButton>
    )

  }


  const Remove_Product_Comp = () => {

    if(type !== 'cart' || !cartCtx) return null;

    return (
      <IconButton
      clsName={classes.header_cross}
      onClick={() => cartCtx.remove_cart_item({ productId: product._id })}
    >
      <Icon_Cross_Bold scale={0.5} />
    </IconButton>
    )

  }




  return (
    <div className={cls_join([classes.root, class_product.root])}>

      {/* ======================= product header ======================= */}
      <div className={classes.header}>

        <div className={cls_join([classes.header_content, class_product.header_content])}>


          {Select_Comp()}


          <div className={cls_join([classes.header_img, class_product.header_img])}>
            <Img
              src={product.primary_img}
              alt="product image"
              width={80}
            />
            {/* <NextImage
              src={product.primary_img}
              alt="product image"
              width={80}
              height={100}
            /> */}
          </div>


          <div className={cls_join([classes.header_name, class_product.header_name])}>

            <Typo
              txt={product.brand}
              size="1.2rem"
              margin="0 0 0.6rem 0"
            />

            <NextLink href={product_url} >
              <Typo
                txt={product.name}
                variant="h3"
                size="1.6rem"
                weight={400}
                color="var(--color_black)"
              />
            </NextLink>

          </div>

        </div>

        {Remove_Product_Comp()}

      </div>

      {/* ======================= item data ======================= */}

      <div className={classes.item_data_div}>

        <div className={classes.item_list}>
          {
            product.variation_list.map(variation => {

              return <Variation_Item
                type={type}
                cartCtx={cartCtx}
                key={`${product._id}_${variation._id}`}
                productId={product._id}
                item={variation}
                class_variant={class_variant}
              />
            })
          }
        </div>


        <div className={classes.item_total_div}>

          <Typo
            txt="TOTAL" size="1.7rem"
            clsName={classes.item_total_div_item}
          />

          <Typo
            txt={totalData.quantity}
            size="1.7rem" color="var(--color_black)"
            clsName={classes.item_total_div_item}
          />

          <Typo
            txt={`$${totalData.price}`}
            size="1.7rem" color="var(--color_black)"
            clsName={classes.item_total_div_item}
          />

        </div>



      </div>


    </div>
  )
};