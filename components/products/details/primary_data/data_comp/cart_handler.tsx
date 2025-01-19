// module
import { useState, useEffect, FC, CSSProperties } from 'react';
import { useCart } from '@/hooks/useCart';
// comp
import { TextField } from '@/components/shared/text_field';
// style
import classes from 
'@/styles/products/details/primary_data/data_comp/cart_hanlder.module.css';
import { Button } from '@/components/shared/button/button';
import { Typo } from '@/components/shared/typography';
// types
import { ty_product_one_detail } from '@/types/products.type';
import { Spinner_Section } from '@/components/shared/spinner/section';
// icon
import { Icon_Plus } from '@/components/icons/plus';
import { Icon_Minus } from '@/components/icons/minus';
import { Icon_Cart_General } from '@/components/icons/cart_general';
import { Icon_Cart_Remove } from '@/components/icons/cart_remove';
import { IconButton } from '@/components/shared/button/icon_button';

interface IComp {
  is_disable: boolean;
  product: ty_product_one_detail;
  current_vairation_id: string|null;
  selected_color: string|null;
  selected_size: string|null;
  current_price: number|null;
  current_img: string;

}


export const Cart_Handler: FC<IComp> = ({ 
  is_disable, product, current_vairation_id, 
  selected_color, selected_size,
  current_price, current_img
}) => {


  const [cartAmount, setCartAmount] = useState(1);
  const [isExist_onCart, setIsExist_onCart] = useState(false);

  const { 
    add_cart_item, remove_cart_item, check_variation_item,
    update_item_amount, status: cartStatus 
  } = useCart();

  const btn_style: CSSProperties = {
    padding: '0rem 1rem',
  }

  // ============================== effects ==============================
  useEffect(() => {

    if(current_vairation_id) {

      const selectedVariation = check_variation_item({
        productId: product._id, variationId: current_vairation_id
      })

      if(selectedVariation) {
        setCartAmount(selectedVariation.quantity);
        setIsExist_onCart(true);
        return;
      }

    }

    setIsExist_onCart(false);

  }, [current_vairation_id, cartStatus]);


  useEffect(() => {

    if (cartAmount > 0 && current_vairation_id) {
      update_item_amount({
        productId: product._id,
        variationId: current_vairation_id,
        quantity: cartAmount
      });
    }

  }, [cartAmount]);


  // ============================== handler ==============================
  const decrement_handler = () => {
    if(cartAmount <= 1) return null;
    setCartAmount(cartAmount-1);
  }

  const input_amount_handler = (value: string) => {

    let num = value ? Number(value) : 0;

    setCartAmount(num)

  }

  // ============================ cart handler ============================
  const cartAddHanlder = () => {

    if(
      cartAmount < 1 || !current_vairation_id || !current_price || 
      !selected_color || !selected_size
    ) {
      return null;
    };

    add_cart_item({
      productId: product._id,
      product_name: product.name,
      // product_img: product.image_primary,
      product_img: product.image_variation,
      brand: product.brand,
      variationId: current_vairation_id,
      quantity: cartAmount,
      color: selected_color,
      size: selected_size,
      variation_img: current_img,
      variation_price: current_price
    });

    setIsExist_onCart(true);

  }

  const cartRemoveHanlder = () => {

    if(!current_vairation_id) return null;

    remove_cart_item({
      productId: product._id,
      variationId: current_vairation_id
    });

    setIsExist_onCart(false);

  }


  return (

    <Spinner_Section 
      isVisible={cartStatus === 'loading'}
    >

      <div className={classes.root}>

        <div className={classes.input_div}>

          <IconButton
            not_round_icon={true}
            Sx={btn_style}
            onClick={decrement_handler}
          >
            <Icon_Minus scale={0.4} />
          </IconButton>

          <div style={{margin: '0 0.2rem', transform: 'translateY(-1.6rem)'}} >
            <TextField
              type="number"
              value={String(cartAmount).replace(/^[0]+/g, "")}
              label="Insert Amount"
              changeHandler={input_amount_handler}
              value_is_center={true}
            />
          </div>

          <IconButton 
            not_round_icon={true}
            Sx={btn_style}
            onClick={()=> setCartAmount(cartAmount+1)}
          >
            <Icon_Plus scale={0.4} />
          </IconButton>


        </div>

        <div className={classes.cart_btn_div}>

          {
            isExist_onCart ?

              <Button
                variant="contained"
                Sx={{ width: '100%' }}
                onClick={cartRemoveHanlder}
              >

                <Icon_Cart_Remove fill="var(--color_white)" />

                <Typo
                  txt="Remove from Cart"
                  size="1.5rem"
                  margin="0 0 0 1rem"
                  color="var(--color_white)"

                />

              </Button> :

              <Button
                variant="contained"
                Sx={{ 
                  width: '100%',
                  borderColor: 'var(--color_blue_black)',
                  ...(is_disable ? 
                    {
                      backgroundColor: 'var(--color_blue_black)', 
                      opacity: '0.7' 
                    } :
                    {
                      backgroundColor: 'var(--color_blue_black)'
                    }
                  )
                }}
                disabled={is_disable}
                onClick={cartAddHanlder}
              >

                <Icon_Cart_General fill="var(--color_white)" />

                <Typo
                  txt="Add to Cart"
                  // color={is_disable ? "rgba(0, 0, 0, 0.26)" : "var(--color_white)"}
                  color="var(--color_white)"
                  size="1.5rem"
                  margin="0 0 0 1rem"
                />

              </Button>

          }



        </div>

      </div>

    </Spinner_Section>

  )

};