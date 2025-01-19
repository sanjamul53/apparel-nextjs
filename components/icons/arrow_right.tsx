import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Arrow_Right: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
    />
  )
};