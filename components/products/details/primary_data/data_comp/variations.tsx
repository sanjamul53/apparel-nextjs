// module
import { useState, useEffect, FC, Fragment, Dispatch, SetStateAction } from 'react';
// types
import { ty_product_one_detail_variation_item } from '@/types/products.type';
import { TL_selected_color } from '../data';
// styles
import { Typo } from '@/components/shared/typography';
import { Icon_Check_Bold } from '@/components/icons/check_bold';
import { Icon_Cross_Bold } from '@/components/icons/cross_bold';
import { IconButton } from '@/components/shared/button/icon_button';
import { cls_join } from '@/functions/cls_join.func';
import { useWindow } from '@/hooks/useWindow';
// style
import classes from
  '@/styles/products/details/primary_data/data_comp/variations.module.css';

interface IComp {
  list: ty_product_one_detail_variation_item[];
  selected_color: TL_selected_color | null;
  selected_size: string | null;
  setSelected_color: Dispatch<SetStateAction<TL_selected_color | null>>;
  setSelected_size: Dispatch<SetStateAction<string | null>>;
}

const default_color_sizes = (list: ty_product_one_detail_variation_item[]) => {

  // handle color list
  let cl_list: { [key: string]: string } = {};

  let sz_list: { [key: string]: number } = {};

  list.forEach(el => {

    cl_list = {
      ...cl_list,
      [el.color_hex]: el.color
    }

    sz_list = {
      ...sz_list,
      [el.size]: 1
    }

  });

  return {
    default_cl_list: cl_list,
    default_sz_list: sz_list
  }

}

export const Variations: FC<IComp> = ({
  list, selected_color, selected_size, setSelected_color, setSelected_size
}) => {

  const { default_cl_list, default_sz_list } = default_color_sizes(list);

  const [color_list, setColor_list] =
    useState<{ [key: string]: string }>({ ...default_cl_list });

  const [size_list, setSize_list] =
    useState<{ [key: string]: number }>({ ...default_sz_list });

  const [iconScale, setIconScale] = useState({
    cross: 0.6,
    check: 0.7
  });

  const { windowWidth } = useWindow();


  // =================== handle color and size list ===================
  useEffect(() => {

    if (!selected_color && !selected_size) return;

    let sz_list: { [key: string]: number } = {};

    let cl_list: { [key: string]: string } = {};


    list.forEach(el => {

      // if color is selected, then filter the sizes
      if (selected_color && selected_color.hex === el.color_hex) {
        sz_list = {
          ...sz_list,
          [el.size]: 1
        }
      }

      // if size is selected, then filter the colors
      if (selected_size && selected_size === el.size) {
        cl_list = {
          ...cl_list,
          [el.color_hex]: el.color
        }
      }

    })

    if (selected_color) setSize_list({ ...sz_list });
    if (selected_size) setColor_list({ ...cl_list });

  }, [selected_color, selected_size]);


  // =================== handle icons sizes ===================
  useEffect(() => {

    if(windowWidth > 960) {

      setIconScale({
        cross: 0.6,
        check: 0.7
      });
      return;

    }
    else if(windowWidth > 600) {

      setIconScale({
        cross: 0.5,
        check: 0.5
      });
      return;

    }
    else {

      setIconScale({
        cross: 0.4,
        check: 0.4
      });
      return;

    }

  }, [windowWidth]);



  // =================== reset variation
  const reset_property_handler = () => {

    setSelected_color(null);
    setSelected_size(null);

    setColor_list({ ...default_cl_list });
    setSize_list({ ...default_sz_list });

  }


  return (
    <div className={classes.root} >

      {/* ======================= selected color ======================= */}
      <div className={classes.current_color_div}>


        <div className={classes.current_color_div_data}>


          <Typo
            txt="SELECTED COLOR:"
            variant="h5"
            color="var(--color_black)"
            size="1.4rem"
            margin="0 1.5rem 0 0"
          />

          {
            selected_color ?
              (
                <Fragment>

                  <div
                    style={{ backgroundColor: selected_color.hex }}
                    className={classes.color_item_label}
                  >
                  </div>

                  <Typo
                    txt={selected_color.name}
                    size="1.4rem"
                    margin="0 0 0 1rem"
                  />


                </Fragment>
              ) :
              <Typo
                txt="None"
                variant="h5"
                size="1.4rem"
              />
          }
        </div>

        {
          (selected_color || selected_size) && (

            <div className={classes.reset_property_div}>

              <IconButton
                onClick={reset_property_handler}
              >
                <Icon_Cross_Bold scale={iconScale.cross} />
              </IconButton>

            </div>

          )
        }




      </div>


      {/* ======================= color list ======================= */}

      <div className={classes.color_container}>
        {
          Object.keys(color_list).map(el => {

            const isSelected = selected_color?.hex === el;

            let clsList = [classes.color_item];

            if(isSelected) {
              clsList.push(classes.color_item_selected)
            }

            return (

              <div key={el}
                onClick={() => setSelected_color({
                  hex: el, name: color_list[el]
                })}
                style={{ backgroundColor: el }}
                className={cls_join(clsList)}
              >
  
                {
                  isSelected && (
                    <Icon_Check_Bold 
                      Sx={{ 
                        transform: `translateY(0.2rem) scale(${iconScale.check})` 
                      }}
                      fill="var(--color_white)"
                    />
                  )
                }
  
              </div>
            )

          })
        }
      </div>


      {/* ======================= size list ======================= */}
      <div className={classes.size_container}>

        <Typo txt="SIZE"
          variant="h5" 
          margin="0 0 1.5rem 0" 
          color="var(--color_black)"
          size="1.4rem"
        />

        <div className={classes.size_item_list}>

          {
            Object.keys(size_list).map(el => {

              const isSelected = selected_size === el;

              return (
                <div key={el} className={classes.size_item}
                  onClick={() => setSelected_size(el)}
                  style={{
                    ...(isSelected && {
                      backgroundColor: 'var(--color_slate_blue)',
                      borderColor: 'var(--color_slate_blue)',
                      color: 'var(--color_white)'
                    })
                  }}
                >
                  {el}
                </div>
              )

            })
          }

        </div>

      </div>


    </div>
  )


};