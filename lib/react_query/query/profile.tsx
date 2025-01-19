import { useQuery } from '@tanstack/react-query';
import { ty_dashboard_order_item } from '@/types/dashboard/dashboard_order.type';
import { Fetch } from '@/functions/fetch';
import { useQuery_defaultOptions } from '../default_option';

interface T_fetchProfile {
  _id: string;
  name: string;
  email: string;
  image: string;
}


interface T_query_profile_getOne_param {
  user_id: string;
}


// =============================== get own profile ===============================
export const query_profile_getOne = (
  { user_id }: T_query_profile_getOne_param
) => {

  const fetchProfile = () => Fetch<T_fetchProfile>({
    url: '/profile/getOwn',
    methodType: 'GET'
  });

  const { status, data } = useQuery({
    queryKey: ['profile', user_id],
    queryFn: fetchProfile,
    ...useQuery_defaultOptions
  });

  return {
    status,
    data
  }
};


