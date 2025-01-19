"use client";
import { useState, FC, ReactNode, CSSProperties } from 'react';
import classes from '@/styles/shared/accordion.module.css';
import { cls_join } from '@/functions/cls_join.func';
import { z_index_list } from '@/utils/z_index_list';
import { Icon_Arrow_Down } from '../icons/arrow_down';
import { Typo } from './typography';
import { Icon_Arrow_Up } from '../icons/arrow_up';

export interface ty_dropdown_data_item {
  label: string;
  value: string;
}

interface IComp {
  title: string;
  children: ReactNode;
  Sx?: CSSProperties;
  defaultOpen?: boolean;
}

export const Accordion: FC<IComp> = ({ title, children, Sx, defaultOpen }) => {

  const [isOpen, setIsOpen] = useState(defaultOpen ? defaultOpen: false);


  return (
    <div className={classes.root}
      style={{ ...(Sx && Sx) }}
    >


      <div className={classes.title_div}
        onClick={() => setIsOpen(!isOpen)}
      >

        <h5 style={{fontWeight: 500, fontSize: '1.7rem'}} >
          {title}
        </h5>

        {
          isOpen ?
            <Icon_Arrow_Up fill="#111" dimension={15}
              Sx={{ transform: 'translateY(0.5rem)' }}
            /> :
            <Icon_Arrow_Down fill="#111" dimension={15}
              Sx={{ transform: 'translateY(0.5rem)' }}
            />
        }



      </div>


      {
        isOpen && (
          <div className={classes.content}>
            {children}
          </div>
        )
      }


    </div>
  )


};