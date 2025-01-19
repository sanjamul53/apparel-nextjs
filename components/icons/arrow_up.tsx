import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Arrow_Up: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"
    />
  )
};