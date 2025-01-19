import { FC } from 'react';
import classes from '@/styles/shared/stepper.module.css';
import { cls_join } from '@/functions/cls_join.func';
import { Icon_Check_Bold } from '../icons/check_bold';

interface IComp {
  list: string[];
  currentIdx: number;
  clsName?: string;
}

export const Stepper: FC<IComp> = ({ list, currentIdx, clsName }) => {


  return (
    <div className={cls_join([classes.root, clsName|| ''])} >

      {
        list.map((el, idx) => (

          <div key={el}
            className={classes.container}
            style={{
              flex: `0 0 ${Number((100 / list.length).toFixed(2))}%`
            }}
          >

            {/* ==================== line ==================== */}

            {
              idx > 0 && idx < list.length && (
                <div 
                  className={classes.line}
                  style={{
                    ...( idx < currentIdx && {
                      backgroundColor: 'var(--color_primary)',
                    })
                  }}
                >

                </div>
              )
            }


            {/* ==================== circle ==================== */}
            <div 
              className={classes.circle}
              style={{
                ...( idx <= currentIdx && {
                  borderColor: 'var(--color_primary)',
                })
              }}
            >

              { idx <= currentIdx && 
                <Icon_Check_Bold scale={0.5} fill="var(--color_primary)" /> 
              }

              <span className={classes.circle_txt} >
                {list[idx]}
              </span>


            </div>

            {/* ==================== line ==================== */}

            {
              idx < list.length - 1 && (
                <div 
                  className={classes.line}
                  style={{
                    ...( idx < currentIdx && {
                      backgroundColor: 'var(--color_primary)',
                    })
                  }}
                >

                </div>
              )
            }


          </div>
        ))
      }

    </div>
  )
};