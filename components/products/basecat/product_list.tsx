import { FC } from 'react';
import { ty_product_item } from '@/types/products.type';
import classes from '@/styles/products/basecat/product_list.module.css';
import { Typo } from '@/components/shared/typography';
import { Product_List_Item } from '../list_item';

interface IComp {
  list: ty_product_item[]|null;
}

export const Product_List: FC<IComp> = ({list}) => {

  if(!list || list.length === 0) {

    return (
      <div className={classes.empty_list}>

        <Typo
          txt="No Products Found"
          variant="h3"
          size="2.5rem"
        />

      </div>
    )

  }

  return (
    <div className={classes.root}>

      {
        list.map(el => (
          <div
            key={el._id}
            className={classes.list_item}
          >
            <Product_List_Item item={el} />
          </div>
        ))
      }

    </div>
  )

};