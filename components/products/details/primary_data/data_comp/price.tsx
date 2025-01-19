import { FC, Fragment } from 'react';
import { is_integer } from '@/functions/is_integer.func';
import { calculate_percentage } from '@/functions/calculate_percentage.func';
import { Typo } from '@/components/shared/typography';
import classes from 
'@/styles/products/details/primary_data/data_comp/price.module.css';

interface IComp {
  value: number|null;
  primary_value: {min: number; max: number};
  offer: number;
}

const num_part = (num: number) => {

  let int_part = Math.floor(num);
  let float_part = num - int_part;

  if(is_integer(num)) {
    int_part = num;
    float_part = 0;
  }

  return {
    int: `${int_part}`,
    float: `${float_part.toFixed(2).substring(2)}`
  }

}


type T_render_num = {
  num_single?: number;
  num_double?: { min: number; max: number }
  is_offer: boolean;
}

export const Price_Comp: FC<IComp> = ({ value, primary_value, offer }) => {

  const render_num_value = (
    { num_single, num_double, is_offer }: T_render_num
  ) => {

    // render number for one price item
    if(num_single) {


      const single_price_parts = num_part(num_single);
  
  
      return (
        <h4  
          className={
            is_offer ? classes.offer_part : classes.price_part
          }
        >
          ${single_price_parts.int}.
  
          <span 
            className={
              is_offer ? classes.offer_part_fraction : classes.price_part_fraction
            }
          >
            {single_price_parts.float}
          </span>
        </h4>
      )

    }

    // render number for two price item
    if(num_double) {

      const min_price_parts = num_part(num_double.min);
      const max_price_parts = num_part(num_double.max);

      return (
        <h4  
          className={
            is_offer ? classes.offer_part : classes.price_part
          }
        >
          ${min_price_parts.int}.
  
          <span
            className={
              is_offer ? classes.offer_part_fraction : classes.price_part_fraction
            }
          >
            {min_price_parts.float}
          </span>
  
          <span style={{margin: '0 0.5rem'}} >
            -
          </span>
  
          ${max_price_parts.int}.
  
          <span
            className={
              is_offer ? classes.offer_part_fraction : classes.price_part_fraction
            }
          >
            {max_price_parts.float}
          </span>
  
        </h4>
      )

    }

    return null;

  }


  const render_value = () => {

    if(value || (primary_value.min === primary_value.max) ) {

      const single_value = value ? value: primary_value.min;

      const offer_value = calculate_percentage({
        num: single_value,
        percentage: offer
      });

      return (
        <Fragment>

          {render_num_value({
            num_single: offer_value,
            is_offer: false
          })}

          {
            offer > 0 && 
            render_num_value({
              num_single: single_value,
              is_offer: true
            })
          }

        </Fragment>
      )

    }

    else {

      const offer_price = {
        min: calculate_percentage({ 
          num: primary_value.min, percentage: offer 
        }),
        max: calculate_percentage({
          num: primary_value.max, percentage: offer
        })
      }

      return (
        <Fragment>

          {render_num_value({
            num_double: offer_price,
            is_offer: false
          })}

          {
            offer > 0 && render_num_value({
              num_double: primary_value,
              is_offer: true
            })
          }

        </Fragment>
      )

    }

  }


  return (
    <Fragment>

      <div className={classes.price_root}>
        {render_value()}
      </div>

      {
        offer > 0 && (
          <div className={classes.offer_root}>
            
            <Typo
              txt={`${offer}% Sale`}
              color="var(--color_white)"
              size="1.5rem"
              clsName={classes.offer_value}
            />

          </div>
        )
      }


    </Fragment>
  )

};