import { Dispatch, SetStateAction } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { ty_dashboard_order_item } from '@/types/dashboard/dashboard_order.type';
import { Fetch } from '@/functions/fetch';
import { useQuery_defaultOptions } from '../default_option';



type T_query_order_getAll_Param = {
  user_id: string;
  page: number;
}

type T_query_order_getOne_Param = {
  order_id: string;
}

type T_mutate_order_delete_param = {
  order_id: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
  urlHandler: () => void;
}

// =============================== get all orders ===============================
export const query_order_getAll = (
  { page, user_id }: T_query_order_getAll_Param
) => {

  const fetchOrders = () => Fetch({
    url: `/orders/getAll?page=${page}`,
    methodType: 'GET'
  });

  const { status, data = [], fetchStatus } = useQuery({
    queryKey: ['order', 'list', page, user_id],
    // queryKey: ['order_list', page, user_id],
    queryFn: fetchOrders,
    ...useQuery_defaultOptions
  });

  return {
    status,
    data: data as ty_dashboard_order_item[],
    fetchStatus
  }
};

// =============================== get all orders ===============================
export const query_order_getOne = ({ order_id }: T_query_order_getOne_Param) => {

  const fetchRes = () => {

    if(!order_id) {
      throw new Error('invalid id');
    }

    return Fetch<any>({
      url: `/orders/getOne?id=${order_id}`,
      methodType: 'GET'
    });

  }

  const { status, data = null } = useQuery({
    queryKey: ['order', 'detail', order_id],
    queryFn: fetchRes,
    ...useQuery_defaultOptions
  });


  return {
    status,
    data
  }
};

// =============================== delete one orders ===============================
export const mutation_order_delete = (
  {
    order_id, setVisible, urlHandler
  }: T_mutate_order_delete_param
) => {

  const queryClient = useQueryClient();

  const cancelQuery = () => Fetch({
    url: `/orders/deleteOne?id=${order_id}`,
    methodType: 'DELETE'
  })

  const mutation = useMutation({
    mutationFn: cancelQuery,

    onSuccess: () => {


      // invalidate all order list
      // queryClient.invalidateQueries({ queryKey: ['order_list'] });
      queryClient.invalidateQueries({ queryKey: ['order', 'list'] });

      // invalidate exact order item
      queryClient.invalidateQueries({
        queryKey: ['order', 'detail', order_id],
        exact: true,
      });


      setVisible(false);
      urlHandler();
    },

    onError: () => {
      setVisible(false);
    }

  })

  return { mutation }

}


// ==================== create one order ====================
export const mutation_order_create = () => {

}



// ==================== invalidate one order ====================

/*
  two must condition, to use that hook
  - use this hook, inside ReactQueryProvider component
  - and the inside componet have to be client component
*/

type T_use_query_invalidate_order = 'all'| 'list';

export const use_query_invalidate_order = (type: T_use_query_invalidate_order) => {

  const queryClient = useQueryClient();

  if(type === 'all') {
    queryClient.invalidateQueries({ queryKey: ['order'] });
  }
  else if(type === 'list') {
    queryClient.invalidateQueries({ queryKey: ['order', 'list'] });
  }


}
