import { FC } from 'react';
import classes from '@/styles/shared/spinner/page.module.css';

interface IComp {
  dimension?: string;
}

export const Spinner_Page: FC<IComp> = ({ dimension }) => {
  return (
    <div className={classes.container} >

      <div className={classes.lds_ring}
        style={{
          height: dimension || '20rem',
          width: dimension || '20rem'
        }}
      >

        <div></div><div></div><div></div><div></div>

      </div>

    </div>
  )
};