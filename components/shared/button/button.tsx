import { CSSProperties, FC, ReactNode } from 'react';
import classes from '@/styles/shared/button/button.module.css';
import { cls_join } from '@/functions/cls_join.func';

interface IComp {
  variant?: 'text'|'contained'|'outlined';
  children: ReactNode;
  onClick?: ()=> void;
  Sx?: CSSProperties;
  clsName?: string;
  disabled?: boolean;
}

export const Button: FC<IComp> = ({ 
  children, onClick, Sx, clsName, disabled, variant
}) => {

  // ============== handle class list ==============
  let clsList = [classes.root];

  if(variant === 'contained' || !variant) {
    clsList.push(classes.variant_contained);
  }
  else if(variant === 'outlined') {
    clsList.push(classes.variant_outlined);
  }
  else if(variant === 'text') {
    clsList.push(classes.variant_text);
  }

  const isDisabled = disabled === true ? true: false;

  let customStyle: CSSProperties = {};

  if(isDisabled) {

    customStyle = {
      ...customStyle,
      color: 'rgba(0, 0, 0, 0.26)',
      cursor: 'default'
    }

    if(variant === 'contained' || !variant) {
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