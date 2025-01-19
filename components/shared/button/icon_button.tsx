import { CSSProperties, FC, ReactNode } from 'react';
import classes from '@/styles/shared/button/icon_button.module.css';
import { cls_join } from '@/functions/cls_join.func';

interface IComp {
  variant?: 'text'|'contained'|'outlined';
  children: ReactNode;
  onClick?: ()=> void;
  Sx?: CSSProperties;
  clsName?: string;
  disabled?: boolean;
  not_round_icon?: boolean;
}

export const IconButton: FC<IComp> = ({ 
  children, onClick, Sx, clsName, disabled, variant, not_round_icon
}) => {

  // ============== handle class list ==============
  let clsList = [classes.root];

  if(variant === 'text' || !variant) {
    clsList.push(classes.variant_text);
  }
  else if(variant === 'contained') {
    clsList.push(classes.variant_contained);
  }
  else if(variant === 'outlined') {
    clsList.push(classes.variant_outlined);
  }

  const isDisabled = disabled === true ? true: false;

  let customStyle: CSSProperties = {};

  // ============== check style for icon ==============
  if(not_round_icon) {
    clsList.push(classes.type_icon_rectangular);
  }

  if(isDisabled) {

    customStyle = {
      ...customStyle,
      color: 'rgba(0, 0, 0, 0.26)',
      cursor: 'default'
    }

    if(variant === 'contained') {
      customStyle = {
        ...customStyle,
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        borderColor: 'rgba(0, 0, 0, 0.12)',
      }
    }
    else if(variant === 'outlined') {
      customStyle = {
        ...customStyle,
        borderColor: 'rgba(0, 0, 0, 0.12)',
      }
    }

  }

  // ============== add custom style ==============
  customStyle = {
    ...customStyle,
    ...(Sx ? Sx: {})
  }
  if(clsName) {
    clsList.push(clsName);
  }

  return (
    <button
      onClick={onClick}
      style={customStyle}
      className={cls_join(clsList)}
      disabled={isDisabled}
    >
      {children}
      
    </button>
  )

};