import { FC } from 'react';
import { Section } from '@/components/shared/section';
import classes from '@/styles/primary/cat_products/cat_products.module.css';

// types
import { ty_primary_cat_product } from '@/types/primary_page.type';
import { dashboard_primary_byCategory_query_items }
  from '@/dashboard/primary_page/byCategories';
import { Primary_Product_List } from './product_list';
import { Category_List } from './cat_list';

interface IComp {
  productList: ty_primary_cat_product;
  section_idx: string;
}

export const Cat_Product: FC<IComp> = ({ productList, section_idx }) => {


  const byCategory_item =
  dashboard_primary_byCategory_query_items[section_idx];


  if (!byCategory_item) return null;

  const targetProductList = productList[section_idx];


  if (!targetProductList) return null;

  return (
    <Section>

      <Category_List catItem={byCategory_item} />

      <div className={classes.products_div}>

        <Primary_Product_List
          products={targetProductList}
        />

      </div>

    </Section>
  )

};