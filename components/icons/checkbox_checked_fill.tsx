import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';

export const Icon_Checkbox_Checked_Fill: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      path="M19 0h-14c-2.762 0-5 2.239-5 5v14c0 2.761 2.238 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"
    />
  )
};

// https://iconmonstr.com/checkbox-8-svg/