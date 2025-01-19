import { FC } from 'react';
import { format_date } from '@/functions/format_date.func';
import { PartSection } from '.';
import { ListItem_Verticel } from '@/components/shared/list/verticel_item';
// style
import classes from '@/styles/dashboard/order_detail/summary.module.css';
// types
import { ty_dashboard_order_detail } from '@/types/dashboard/dashboard_order.type';

interface IComp {
  orderData: ty_dashboard_order_detail
}

type T_item = {
  label: string;
  value: string|number;
}

export const OrderDetails_Summary: FC<IComp> = ({ orderData }) => {

  const order_date = format_date(orderData.order_at);

  const itemList: T_item[] = [
    { label: 'Total Price', value: `$${orderData.total_price}` },
    { label: 'Item Quantity', value: orderData.total_quantity },
    { label: 'Payment Status', value: orderData.status },
    { label: 'Paid Amout', value: `$${orderData.paid_amount}` },
    { 
      label: 'Order Date', 
      value: `${order_date.dt} ${order_date.month}, ${order_date.year}` 
    },
    { 
      label: 'Order Time', 
      value: `${order_date.hour} : ${order_date.minute}` 
    },

  ]

  return (
   <PartSection title="Order Summary">

    <div className={classes.root}>

     {
      itemList.map(el => (

        <div key={el.label} className={classes.item}>
          <ListItem_Verticel
            label={el.label} value={el.value}
          />
        </div>
      ))
     }

    </div>

   </PartSection>
  )

};