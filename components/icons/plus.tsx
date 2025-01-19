import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Plus: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
    />
  )

};