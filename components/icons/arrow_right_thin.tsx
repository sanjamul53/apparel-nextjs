import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Arrow_Right_Thin: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
        path="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"
    />
  )

};