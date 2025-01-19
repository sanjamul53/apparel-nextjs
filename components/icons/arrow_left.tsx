import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Arrow_Left: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
    />
  )
};