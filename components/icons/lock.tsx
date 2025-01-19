import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Lock: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M21 21v3h-18v-3h18zm-13-15c0-2.206 1.795-4 4-4s4 1.794 4 4v3h2v-3c0-3.313-2.687-6-6-6s-6 2.687-6 6v3h2v-3zm13 8v-3h-18v3h18zm0 5v-3h-18v3h18z"
    />
  )
};