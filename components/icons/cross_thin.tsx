import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Cross_Thin: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"
      without_viewBox={true}
    />
  )
};