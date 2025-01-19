// module
import { useState, useEffect, FC } from 'react';
import { ty_cart_Context } from '@/context/cartContext';
// comp
import { Img } from '@/components/shared/image';
import { Typo } from '@/components/shared/typography';
import { TextField } from '@/components/shared/text_field';
import { IconButton } from '@/components/shared/button/icon_button';
// icons
import { Icon_Plus } from '@/components/icons/plus';
import { Icon_Minus } from '@/components/icons/minus';
import { Icon_Cross_Bold } from '@/components/icons/cross_bold';
// types
import { ty_cart_variation_item } from '@/types/cart.type';
// style
import classes from '@/styles/products/cart_item/variation_item.module.css';
import { ty_style_class } from '@/types/general.type';
import { cls_join } from '@/functions/cls_join.func';


interface IComp {
  type: 'cart' | 'order';

  productId: string;
  item: ty_cart_variation_item;

  cartCtx?: ty_cart_Context;

  class_variant: ty_style_class;


}

export const Variation_Item: FC<IComp> = ({
  type, item, productId, cartCtx, class_variant
}) => {

  const [quantity, setQuantity] = useState(item.quantity);

  const totalPrice = Number((item.quantity * item.price_single).toFixed(2));


  useEffect(() => {

    if (type !== 'cart' || !cartCtx) return;

    if (quantity > 0) {
      cartCtx.update_item_amount({
        productId,
        variationId: item._id,
        quantity: quantity
      });
    }

  }, [quantity]);


  const increment_handler = () => {

    if (type !== 'cart') return null;

    setQuantity(quantity + 1);
  }

  const decrement_handler = () => {

    if (type !== 'cart') return null;

    const newAmount = quantity - 1;

    if (newAmount < 1) return null;

    setQuantity(newAmount);

  }

  const input_amount_handler = (value: string) => {

    if (type !== 'cart') return null;

    let num = value ? Number(value) : 0;

    setQuantity(num);

  }


  // ===============================================================================
  // ==================================== comps ====================================

  const Cross_Comp = () => {

    if (type !== 'cart' || !cartCtx) return null;

    return (
      <div className={classes.cross_div}>

        <IconButton
          Sx={{ padding: '0.2rem' }}
          onClick={() => cartCtx.remove_cart_item({
            productId, variationId: item._id
          })}
        >
          <Icon_Cross_Bold scale={0.3} />
        </IconButton>

      </div>
    )

  }


  const Amount_Comp = () => {

    if (type !== 'cart') {

      return (
        <Typo
          txt={quantity}
          color="var(--color_black)"
          weight={500}
          size="1.5rem"
          clsName={cls_join([
            classes.amount_static_div, class_variant.amount_static_div
          ])}
        />

      )

    }

    return (

      <div className={classes.amount_div}>

        <div className={classes.amount_controller}>


          <IconButton clsName={classes.amount_btn}
            onClick={decrement_handler}
          >
            <Icon_Minus
              scale={0.4}
              fill="rgba(0, 0, 0, 0.54)"
            />
          </IconButton>

          <TextField
            type="number"
            value={String(quantity).replace(/^[0]+/g, "")}
            changeHandler={e => input_amount_handler(e)}
            label="quantity"
            value_is_center={true}
            Sx={{ maxWidth: '8rem', transform: 'translateY(-1rem)' }}
          />

          <IconButton clsName={classes.amount_btn}
            onClick={increment_handler}
          >
            <Icon_Plus
              scale={0.4}
              fill="rgba(0, 0, 0, 0.54)"
            />
          </IconButton>


        </div>

        <Typo
          txt={`$${item.price_single}`}
          color="var(--color_black)"
          weight={500}
          margin="0.5rem 0 0 0"
          size="1.5rem"
        />

      </div>

    )

  }


  return (
    <div className={classes.root}>


      <div className={cls_join([classes.content_part, class_variant.content_part])}>

        {/* ===================================================================== */}
        {/* ===================================================================== */}
        {/* ============================== Part 01 ============================== */}
        <div className={cls_join([classes.part_01, class_variant.part_01])}>

          {/* ============================== image ============================== */}
          {
            item.img &&
            (
              <div className={cls_join([classes.img_div, class_variant.img_div])}>

                <Img
                  src={item.img}
                  alt="variation image"
                  width={64}
                />
                {/* 
                <NextImage
                  src={item.img}
                  alt="variation image"
                  width={64} height={80}
                /> */}

              </div>
            )
          }


          {/* ============================== size, color ============================== */}
          <div className={classes.cl_sz_div}>

            <div className={classes.cl_sz_item} >
              <Typo txt="Color:" size="1.3rem" />
              <Typo txt={item.color} size="1.3rem" color="var(--color_black)"
                margin="0 0 0 0.7rem"
              />
            </div>

            <div className={classes.cl_sz_item} style={{ marginTop: '1rem' }} >
              <Typo txt="Size:" size="1.3rem" />
              <Typo txt={item.size} size="1.3rem" color="var(--color_black)"
                margin="0 0 0 0.7rem"
              />
            </div>

          </div>

        </div>


        {/* ===================================================================== */}
        {/* ===================================================================== */}
        {/* ============================== Part 02 ============================== */}
        <div className={cls_join([classes.part_02, class_variant.part_02])}>


          {Amount_Comp()}

          {/* ============================== amount total ============================== */}

          <Typo
            txt={`$${totalPrice}`}
            color="var(--color_black)"
            weight={500}
            size="1.5rem"
            clsName={cls_join([classes.total_amount_div, class_variant.total_amount_div])}
          />

        </div>

      </div>



      {Cross_Comp()}

    </div>
  )

};