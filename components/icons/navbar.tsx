import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Navbar: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"
    />
  )
};