"use client";
import { useState, useEffect, useRef, FC, Dispatch, SetStateAction } from 'react';
import classes from '@/styles/shared/dropdown.module.css';
import { cls_join } from '@/functions/cls_join.func';
import { z_index_list } from '@/utils/z_index_list';
import { Icon_Arrow_Down } from '../icons/arrow_down';

export interface ty_dropdown_data_item {
  label: string;
  value: string;
}

interface IComp {
  currentValue: ty_dropdown_data_item | null;
  setCurrentValue: (item: ty_dropdown_data_item) => void;
  list: ty_dropdown_data_item[];
  label: string;
  width?: string;
  label_color?: string;
  label_is_outside?: boolean;
}

export const Dropdown: FC<IComp> = ({ 
  list, label, width, currentValue, setCurrentValue,
  label_color, label_is_outside
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const bodyClick = (e: MouseEvent) => {

      const target: any = e.target;

      if (
        target && dropdownRef?.current &&
        dropdownRef.current.contains(target)
      ) {
        return;
      }

      setIsOpen(false);

    }

    document.body.addEventListener('click', bodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', bodyClick);
    }

  }, []);


  const optionRender = () => {
    return list.map(item => (
      <div
        onClick={() => setCurrentValue({ ...item })}
        key={item.value}
        className={classes.option_item}
      >
        {item.label}
      </div>
    ))
  }


  return (
    <div ref={dropdownRef} className={classes.root}
      onClick={() => setIsOpen(!isOpen)}
      style={{
        width: width || '20rem'
      }}
    >

      <div className={classes.select_box_div}>

        <div className={classes.select_box}>
          <span 
            className={
              (isOpen || currentValue) ? 
              cls_join([classes.label_txt, classes.label_txt_upper]) :
              classes.label_txt
            }
            style={{ 
              ...(label_color && { color: label_color }),
              ...(isOpen && { color: 'var(--color_primary)' }),
              ...(label_is_outside && { 
                top: '-1rem', backgroundColor: 'transparent' 
              })
            }}
          >
            {label}
          </span>

          <h6 
            className={classes.label_selected}
            style={{...(!currentValue && { opacity: 0 })}}
          >
            {currentValue ? currentValue.label: label}
          </h6>

          <Icon_Arrow_Down scale={0.5} fill="#4b566b" />

        </div>


      </div>


      {
        isOpen && (

          <div 
            className={classes.option_list}
            style={{zIndex: z_index_list.dropdown}}
          >
            {optionRender()}
          </div>

        )
      }

    </div>
  )


};