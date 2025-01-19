// module
import { FC } from 'react';
import { useSetURL } from '@/hooks/useSetURL';
// function + data
import { cat_key_to_label } from '@/functions/cat_lableKey_convert.func';
import { accepted_params_filter as accepted_list, Product_PAGE_PARAM }
from '@/app/products/[basecat]/page_data';
// comp
import { Typo } from '@/components/shared/typography';
import { IconButton } from '@/components/shared/button/icon_button';
// icons
import { Icon_Repeat } from '@/components/icons/repeat';
import { Icon_Cross_Bold } from '@/components/icons/cross_bold';
// style
import classes from
'@/styles/products/basecat/dynamic_navbar/selected_params.module.css';
// type
import { ty_page_params } from '@/types/general.type';

interface IComp {
  params: ty_page_params;
}

type T_selectedParam = {
  name: string;
  value: string;
}

export const Selected_Params: FC<IComp> = ({ params }) => {

  const { delete_param, set_param } = useSetURL();

  let selectedList: T_selectedParam[] = [];

  Object.keys(params).forEach((el: any) => {

    if (accepted_list.includes(el)) {

      const currentValue = params[el];

      if (typeof currentValue === 'string') {

        const valueLabel = cat_key_to_label(currentValue);

        selectedList.push({
          name: el,
          value: valueLabel ? valueLabel : currentValue
        })

      }

    }

  });


  // item remove handler
  const itemRemoveHandler = (name: string) => {
    delete_param({ name });
  }

  // item remove handler
  const resetHanlder = () => {
    set_param({
      name: Product_PAGE_PARAM,
      value: 1,
      remove_rest: true
    })
  }


  if (selectedList.length === 0) return null;

  return (
    <div className={classes.root}>

      <div className={classes.title_div}>

        <Typo txt="Selected"
          variant="h6" size="1.6rem" color="var(--color_slate_blue)"
        />



        <IconButton Sx={{ padding: '0' }}
          onClick={resetHanlder}
          clsName={classes.reset_div}
        >
          <Typo txt="RESET" weight={500}
            margin="0 0.5rem 0 0" color="var(--color_primary)"
          />

          <Icon_Repeat scale={0.8} Sx={{ padding: 0 }}
            fill="var(--color_primary)"
          />

        </IconButton>


      </div>

      <div className={classes.selected_div}>

        {
          selectedList.map((el, idx) => (
            <div className={classes.selected_item}
              key={`${el.name}_${idx}`}
              onClick={() => itemRemoveHandler(el.name)}
            >

              <Typo txt={el.value}
                margin="0 0.5rem 0 0" size="1.2rem"
              />

              <Icon_Cross_Bold fill="var(--color_slate_blue)"
                Sx={{ transform: 'translateY(0.2rem) scale(0.4)' }}
              />

            </div>
          ))
        }

      </div>

    </div>
  )

}
