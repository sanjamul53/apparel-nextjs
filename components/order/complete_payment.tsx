// module
import { FC, Fragment } from 'react';
// comp
import { Section_Title } from './shared';
// style
import classes from '@/styles/order/complete_payment.module.css';
import { Order_Payment_Paypal } from './shared/payment_paypal';
import { use_query_invalidate_order } from '@/lib/react_query/query/order';

interface IComp {
  order_id: string;
}


export const Order_Payment_Complete: FC<IComp> = ({ order_id }) => {

  use_query_invalidate_order('list');

  return (
    <Fragment>
      <Section_Title title="Complete Payment" />
      <div className={classes.payment_container}>
        <div className={classes.payment_content}>
          <Order_Payment_Paypal order_id={order_id} />
        </div>
      </div>
    </Fragment>
  )

};