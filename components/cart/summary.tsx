import { useState, useContext, FC, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '@/context/cartContext';
import { useAuth } from '@/hooks/useAuth';
import { useOrder } from '@/hooks/useOrder';
// comp
import { Typo } from '../shared/typography';
import { TextField } from '../shared/text_field';
import { Button } from '../shared/button/button';
// style
import classes from '@/styles/cart/summary.module.css';
import { ty_selected_cart_list } from '@/types/cart.type';
import { SnackBar, ty_snackbar_type } from '../shared/snackbar';

interface IComp {
  selectedList: ty_selected_cart_list;
}

type T_list = { key: string; value: string; }

type T_snackMsg = { type: ty_snackbar_type; msg: string };

export const Cart_Summary: FC<IComp> = ({ selectedList }) => {

  const [summaryData, setSummaryData] = useState({
    price: 0, quantity: 0
  });
  const [promoCode, setPromoCode] = useState('');
  const [snackMsg, setSnackMsg] = useState<T_snackMsg | null>(null);
  const router = useRouter();
  const { cartList } = useContext(CartContext);
  const { authData } = useAuth();
  const { set_order_data } = useOrder();

  useEffect(() => {

    let total_price = 0;
    let total_quantity = 0;



    Object.keys(cartList).forEach(prod_id => {

      if (!selectedList.hasOwnProperty(prod_id)) return null;

      const product = cartList[prod_id];

      Object.values(product.variation_list).forEach(variation => {

        total_price = total_price + variation.quantity * variation.price_single;
        total_quantity = total_quantity + variation.quantity;

      })

    })

    setSummaryData({
      price: total_price,
      quantity: total_quantity
    });

  }, [cartList, selectedList]);


  const dataList: T_list[] = [
    { key: 'Quantity', value: `${summaryData.quantity} items` },
    { key: 'Price', value: `$${summaryData.price}` },
    { key: 'Tax', value: '$0.00' },
    { key: 'Shipping', value: '$0.00' },
    { key: 'Discount', value: '$0.00' },
  ];


  const orderHandler = () => {

    if(Object.keys(selectedList).length === 0) return null;

    if(!authData) {

      setSnackMsg({
        type: 'error', msg: 'Sign in to Place Order'
      });

      return null;
    }

    set_order_data({
      selectedList,
      summaryData
    });

    router.push('/order');

  }


  return (
    <Fragment>

      {
        snackMsg &&
        <SnackBar 
          isOpen={snackMsg ? true: false} 
          closeHandler={()=> setSnackMsg(null)}
          type={snackMsg.type} message={snackMsg.msg}
        />
      }

      <div className={classes.root}>

        <div className={classes.content}>

          <div className={classes.subtotal_div}>

            <Typo txt="Subtotal" variant="h5"
              color="var(--color_blue_black)" size="1.8rem"
            />

            <Typo txt={`$${summaryData.price}`}
              variant="h3" color="var(--color_blue_black)"
              size="2.5rem" margin="1.2rem 0 0 0"
            />

          </div>

          <div className={classes.dataList_div}>
            {
              dataList.map(el => (
                <div key={el.key} className={classes.dataList_item} >

                  <Typo txt={el.key} weight={500} />
                  <Typo txt={el.value} color="var(--color_blue_black)" />

                </div>
              ))
            }
          </div>


          {/* ========================== Apply Promo code ========================== */}

          <div className={classes.promoCode_div}>

            <Typo txt="Apply Promo Code" variant="h5"
              color="var(--color_blue_black)"
            />

            <TextField
              label="Promo Code"
              value={promoCode}
              changeHandler={e => setPromoCode(e)}
            />

            <div style={{ marginTop: '2.5rem' }} >
              <Button variant="outlined" Sx={{ width: '100%' }} >
                Apply Promo Code
              </Button>
            </div>

          </div>


        </div>


        <div className={classes.checkout_div}>

          <Button variant="contained" Sx={{ width: '100%' }}
            onClick={orderHandler}
            disabled={Object.keys(selectedList).length === 0}
          >
            Place Order
          </Button>

        </div>



      </div>

    </Fragment>
  )

};