"use client";
// module
import { FC, Fragment } from 'react';
// comp
import { Similar_Products } from './similar_products';
// style
import { ty_product_item } from '@/types/products.type';


interface IComp {
  productList: ty_product_item[];
}

export const Secondary_Data: FC<IComp> = ({ productList }) => {




  return (
    <Fragment>

      <Similar_Products productList={productList} />

    </Fragment>
  )

};