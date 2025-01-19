// module
import { FC, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSetURL } from '@/hooks/useSetURL';
import { query_order_getAll } from '@/lib/react_query/query/order';
// function
import { format_date } from '@/functions/format_date.func';
import { DASHBOARD_TAB_KEY } from '@/app/dashboard/page_data';
import { cls_join } from '@/functions/cls_join.func';
import { is_integer } from '@/functions/is_integer.func';
// comp
import { Spinner_Page } from '../shared/spinner/page';
import { Page_Message } from '../shared/page_message';
import { Typo } from '../shared/typography';
import { IconButton } from '../shared/button/icon_button';
import { dashboard_order_paginate_doc_count } from '@/dashboard/dashboard';
// icons
import { Icon_Arrow_Left } from '../icons/arrow_left';
import { Icon_Arrow_Right } from '../icons/arrow_right';
// style
import classes from '@/styles/dashboard/orders.module.css';

interface IComp {
  userId: string;
}


export const Dashboard_Orders: FC<IComp> = ({ userId }) => {

  // const [status, setStatus] = useState<ty_fetch_status>('loading');
  const searchParams = useSearchParams();

  // get current page
  const page_param = searchParams.get('page');

  let currentPage = 1;
  if(page_param && is_integer(page_param) && Number(page_param) > 0) {
    currentPage = Number(page_param);
  }

  const { handle_param, set_param } = useSetURL();
  const { status, data: order_list, fetchStatus } = query_order_getAll({
    page: currentPage, user_id: userId
  });


  const item_clickHandler = (orderId: string) => {

    handle_param([
      {
        type: 'insert', name: DASHBOARD_TAB_KEY, value: 'order_detail'
      },
      {
        type: 'insert', name: 'order_id', value: orderId
      }
    ]);

  }


  if (status === 'pending' || fetchStatus === 'fetching') {
    return <Spinner_Page />;
  }

  if (status === 'error') {
    return <Page_Message msg="Failed to get orders" />;
  }

  if (order_list.length === 0) {
    return <Page_Message msg="You have not any order" />;
  }


  return (
    <Fragment>

      <table className={classes.list}>

        <thead>

          <tr className={cls_join([classes.list_item, classes.list_item_header])}>

            <td className={classes.item_date} >
              <Typo txt="Order Date" color="var(--color_slate_blue)"
                weight={500}
              />
            </td>

            <td className={classes.item_price}>
              <Typo txt="Price" align="center" color="var(--color_slate_blue)"
                weight={500}
              />
            </td>

            <td className={classes.item_quantity}>
              <Typo txt="Quantity" align="center" color="var(--color_slate_blue)"
                weight={500}
              />
            </td>

            <td className={classes.item_pay_status}>
              <Typo txt="Payment Status" align="right" color="var(--color_slate_blue)"
                weight={500}
              />
            </td>

          </tr>

        </thead>

        <tbody>

          {
            order_list.map(item => {

              const order_date = format_date(item.order_at);

              return (
                <tr key={item._id} className={classes.list_item}
                  onClick={() => item_clickHandler(item._id)}
                >

                  <td className={classes.item_date} >
                    <Typo
                      txt={`${order_date.dt} ${order_date.month} ${order_date.year}`}
                    />
                  </td>

                  <td className={classes.item_price}>
                    <Typo txt={`$${item.total_price}`} align="center" />
                  </td>

                  <td className={classes.item_quantity}>
                    <Typo txt={item.total_quantity} align="center" />
                  </td>

                  <td className={classes.item_pay_status}>
                    <Typo txt={item.status} align="right" />
                  </td>

                </tr>
              )

            })
          }
        </tbody>


      </table>

      <div className={classes.iconList}>

        <IconButton 
          disabled={currentPage === 1}
          onClick={()=> set_param({name: 'page', value: currentPage - 1}) }
        >
          <Icon_Arrow_Left 
            scale={0.6}
            fill={
              currentPage === 1 ? '#ccc': 'var(--color_black)'
            }
          />
        </IconButton>

        <IconButton 
          disabled={order_list.length < dashboard_order_paginate_doc_count}
          onClick={()=> set_param({name: 'page', value: currentPage + 1}) }
        >
          <Icon_Arrow_Right 
            scale={0.6}
            fill={
              order_list.length < dashboard_order_paginate_doc_count ?
              '#ccc': 'var(--color_black)'
            }
          />
        </IconButton>

      </div>

    </Fragment>

  )

};