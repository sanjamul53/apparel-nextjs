// module
import { useState, useEffect, Fragment, FC, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { query_order_getOne } from '@/lib/react_query/query/order';
import { ssactive_img } from '@/functions/ssactive_img.func';
// comp
import { Spinner_Page } from '../../shared/spinner/page';
import { Page_Message } from '../../shared/page_message';
import { Typo } from '../../shared/typography';
import { OrderDetails_Products } from './products';
import { OrderDetails_Summary } from './summary';
import { OrderDetails_Action } from './action';
// types
import { ty_dashboard_order_detail } from '@/types/dashboard/dashboard_order.type';
// style
import classes from '@/styles/dashboard/order_detail/order_detail.module.css';

export const Dashboard_Order_Detail = () => {

  const searchParams = useSearchParams();
  // get order id
  const order_id = searchParams.get('order_id');

  const { status, data: queryData } = query_order_getOne({ order_id: order_id || '' });

  const [orderData, setOrderData] = useState<ty_dashboard_order_detail | null>(null);
  // const [status, setStatus] = useState<ty_fetch_status>('loading');


  useEffect(() => {

    if (!queryData) return;



    // rename the fields for client
    let order_products = [...queryData.products].map(prod => {

      const variations = prod.variation_list.map((el: any) => ({
        ...el,
        price_single: Math.round(el.totalPrice / el.quantity)
      }))

      return {
        ...prod,
        // primary_img: `https://cdn.ssactivewear.com/${prod.primary_img}`,
        primary_img: ssactive_img({ src: prod.primary_img, size: 'xs' }),
        variation_list: [...variations]
      }

    })

    setOrderData({ ...queryData, products: [...order_products] });



  }, [queryData]);


  if (!order_id) {
    return <Page_Message msg="Invalid Order Id" />;
  }

  if (status === 'pending') {
    return <Spinner_Page />;
  }

  if (status === 'error' || !orderData) {
    return <Page_Message msg="Failed to get order" />; 
  }


  return (
    <Fragment>

      <OrderDetails_Summary orderData={orderData} />

      <OrderDetails_Products products={orderData.products} />

      {
        orderData && orderData.status === 'pending' &&
        <OrderDetails_Action orderData={orderData} />
      }


    </Fragment>
  )

};

interface IPartSection {
  title: string;
  children: ReactNode
}

export const PartSection: FC<IPartSection> = ({ title, children }) => {

  return (
    <div className={classes.part_section}>

      <Typo
        txt={title} variant="h4"
      />

      <div className={classes.content} >
        {children}
      </div>

    </div>
  )

}