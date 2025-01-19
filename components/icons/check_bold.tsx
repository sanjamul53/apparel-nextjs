import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Check_Bold: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
    />
  )
};