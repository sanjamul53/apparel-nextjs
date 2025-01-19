import { FC } from 'react';
import { Section } from '@/components/shared/section';
import { Typo } from '@/components/shared/typography';
import { ty_product_item } from '@/types/products.type';
// style
import classes from 
'@/styles/products/details/secondary_data/similar_products.module.css'
import { Product_List_Item } from '../../list_item';


interface IComp {
  productList: ty_product_item[];
}

export const Similar_Products: FC<IComp> = ({ productList }) => {

  return (
    <Section>
      
      <Typo txt="You may also like"
        variant="h3" align="center"
      />

      <div className={classes.product_list}>
        {
          productList.map(el => (
            <div key={el._id} className={classes.product_item}>
              <Product_List_Item item={el} />
          </div>
          ))
        }
      </div>

    </Section>
  )

};