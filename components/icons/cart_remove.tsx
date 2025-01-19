import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Cart_Remove: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M24 8v2h-.642c-.534 0-1.022.305-1.257.786l-4.101 10.214h-12l-4.101-10.216c-.234-.48-.722-.784-1.256-.784h-.643v-2h3l4.352 11h9.296l4.352-11h3zm-9.428 7c1.039-6.826-3.961-10.102-3.961-10.102l.778-1.898-5.389 2.26 2.27 5.384.809-2.006c-.001 0 4.591 1.74 5.493 6.362z"
    />
  )
  
};