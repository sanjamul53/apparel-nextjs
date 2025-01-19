"use client";
import { useState, FC } from 'react';
import { useSetURL } from '@/hooks/useSetURL';
// comp
import { Typo } from '@/components/shared/typography';
// data + functions
import { cat_key_to_label } from '@/functions/cat_lableKey_convert.func';
import { Product_PAGE_PARAM } from '@/app/products/[basecat]/page_data';
// styles
import classes from
  '@/styles/products/basecat/dynamic_navbar/radio_selector.module.css';
// type
import { ty_product_filter_data_item, ty_product_query_param }
from '@/types/products.type';
import { ty_page_params } from '@/types/general.type';
// icons
import { Icon_Checkbox_Unchecked } from '@/components/icons/checkbox_uncheck';
import { Icon_Arrow_Down } from '@/components/icons/arrow_down';
import { Icon_Arrow_Up } from '@/components/icons/arrow_up';
import { Icon_Checkbox_Checked_Fill } from '@/components/icons/checkbox_checked_fill';

interface IComp {
  params: ty_page_params;
  param_name: ty_product_query_param;
  title: string;
  option_list: ty_product_filter_data_item[];
  is_specification?: boolean;
  init_open?: boolean; // by default will this list will be expand or not
  default_optionId?: string;
}

export const Radio_Selector: FC<IComp> = ({
  title, option_list, is_specification, param_name, params, init_open,
  default_optionId
}) => {

  const [isOpen, setIsOpen] = useState(init_open ? true : false);
  const { handle_param } = useSetURL();


  let current_param_id: string | null = null;

  if (params.hasOwnProperty(param_name)) {

    if (typeof params[param_name] === 'string') {
      current_param_id = params[param_name] as string;
    }

  }

  const clickHanlder = (value: string) => {

    // if selected item is current_param, then remove the param item
    if (current_param_id == value) {
      // delete_param({ name: param_name });
      handle_param([
        { type: 'delete', name: param_name },
        { type: 'insert', name: Product_PAGE_PARAM, value: 1 },
      ]);
    }
    else {
      handle_param([
        { type: 'insert', name: param_name, value: value },
        { type: 'insert', name: Product_PAGE_PARAM, value: 1 },
      ]);
      // set_param({ name: param_name, value: value  });
    }

    // set_param({
    //   name: Product_PAGE_PARAM, value: 1
    // })

  }

  const render_items = () => {

    return option_list.map(el => {

      let item_label: string = `${el._id}`;
      if (is_specification) {
        item_label = cat_key_to_label(el._id) || item_label;
      }

      if(el.label) {
        item_label = el.label;
      }

      return (
        <li className={classes.option_item}
          key={`${param_name}_${el._id}`}
          onClick={() => clickHanlder(`${el._id}`)}
        >

          <div className={classes.option_item_title}>

            {
              (
                (current_param_id && current_param_id == el._id) ||
                (!current_param_id && el._id === default_optionId )
              ) ?
                <Icon_Checkbox_Checked_Fill
                  fill="#333"
                  Sx={{ transform: 'translateY(0.1rem) scale(0.5)' }}
                /> :
                <Icon_Checkbox_Unchecked
                  fill="#333"
                  Sx={{ transform: 'translateY(0.1rem) scale(0.5)' }}
                />
            }

            <Typo
              txt={item_label}
              size="1.2rem"
              margin="0 0 0 0.5rem"
              // color="var(--color_blue_black)"
              color="#333"
            />
          </div>

          {
            el.total &&
            <div>
              <Typo
                txt={el.total}
                size="1.2rem"
                margin="0 1.5rem 0 0"
              />
            </div>
          }

        </li>
      )

    })

  }

  return (
    <div className={classes.root}
    >

      <div
        className={classes.title_div}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typo
          txt={title}
          variant="h4"
          // color="#373f50"
          color="var(--color_black)"
          size="1.4rem"
          weight={500}
        />

        <div>
          {
            isOpen ?
              <Icon_Arrow_Up fill="var(--color_black)" scale={0.4} /> :
              <Icon_Arrow_Down fill="var(--color_black)" scale={0.4} />
          }
        </div>

      </div>


      {
        isOpen &&
        (
          <ul className={classes.option_div}>
            {render_items()}
          </ul>
        )
      }

    </div>
  )

};