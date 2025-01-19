// module
import { FC, useState } from 'react';
import { useSetURL } from '@/hooks/useSetURL';
import { mutation_order_delete } from '@/lib/react_query/query/order';
// data
import { DASHBOARD_TAB_KEY, TL_menu_tab } from '@/app/dashboard/page_data';
// comp
import { PartSection } from '.';
import { Typo } from '@/components/shared/typography';
import { Button } from '@/components/shared/button/button';
import { Spinner_Section } from '@/components/shared/spinner/section';
import { Order_Payment_Paypal } from '@/components/order/shared/payment_paypal';
// style
import classes from '@/styles/dashboard/order_detail/action.module.css';
// types
import { ty_dashboard_order_detail } from '@/types/dashboard/dashboard_order.type';

interface IComp {
  orderData: ty_dashboard_order_detail;
}

const orderTab: TL_menu_tab = 'order';

export const OrderDetails_Action: FC<IComp> = ({ orderData }) => {

  const [spinner_isVisible, setSpinner_isVisible] = useState(false);
  const { set_param } = useSetURL();

  const { mutation } = mutation_order_delete({
    order_id: orderData._id, setVisible: setSpinner_isVisible,
    urlHandler: () => {

      set_param({
        name: DASHBOARD_TAB_KEY,
        value: orderTab,
        remove_rest: true
      })


    }
  });


  // ======================== order cancel handler ========================
  const orderCancelHanlder = () => {
    setSpinner_isVisible(true);
    mutation.mutate();
  }


  return (
    <PartSection title="Payment / Action">

      <Spinner_Section isVisible={spinner_isVisible} dimension="10rem" >


        <div className={classes.root}>

          <div className={classes.action_div}>

            <div>
              <Typo
                txt="Complete Payment to continue the process..."
                margin="0 0 0.6rem 0"
              />

              <Typo
                txt={`Total Payment: $${orderData.total_price}`}
                margin="0 0 0.6rem 0"
              />

              <Typo
                txt="You can cancel this order"
                margin="0 0 1.5rem 0"
              />

              <Button variant="contained"
                onClick={orderCancelHanlder}
                Sx={{ width: '100%', maxWidth: '30rem' }}
              >
                Cancel Order
              </Button>
            </div>

          </div>


          <div className={classes.payment_div}>
            <div className={classes.payment_content}>
              <Order_Payment_Paypal order_id={orderData._id} />
            </div>
          </div>



        </div>

      </Spinner_Section>


    </PartSection>
  )

};