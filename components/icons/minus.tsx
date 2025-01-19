import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Minus: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M0 10h24v4h-24z"
    />
  )

};