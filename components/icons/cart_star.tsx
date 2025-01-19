import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Cart_Star: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      without_viewBox={true}
      path="M24 6v2h-.642c-.534 0-1.022.305-1.257.786l-4.101 10.214h-12l-4.102-10.216c-.234-.48-.72-.784-1.255-.784h-.643v-2h3l4.352 11h9.297l4.351-11h3zm-12-1l1.223 2.523 2.777.383-2.021 1.943.493 2.76-2.472-1.322-2.472 1.322.493-2.76-2.021-1.943 2.777-.383 1.223-2.523z"
    />
  )
};