"use client";
import { useRef, useEffect, useState, FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import classes from '@/styles/shared/backdrop.module.css';
import { z_index_list } from '@/utils/z_index_list';

interface IComp {
  close?: () => void;
  children: ReactNode;

  blur?: boolean;
  center?: boolean;
  width?: string;
  clsName?: string;
}

export const Backdrop: FC<IComp> = ({ children, close, blur, center, width, clsName }) => {

  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  let clsList = [classes.root];

  if (blur) {
    clsList.push(classes.bg);
  }

  if (center) {
    clsList.push(classes.center);
  }

  useEffect(() => {
    const dom = document.getElementById('portal');
    if (dom) {
      ref.current = dom;
      setMounted(true)
    }
  }, []);

  if (mounted && ref.current) {

    return createPortal(

      <div
        onClick={close}
        className={clsList.join(' ')}
        style={{ zIndex: z_index_list.backdrop }}
      >
        <div onClick={e => e.stopPropagation()}
          style={{ ...(width && { width }) }}
          className={clsName || ''}
        >
          {
            children
          }
        </div>
      </div>,

      ref.current
    )

  }

  return null;


}