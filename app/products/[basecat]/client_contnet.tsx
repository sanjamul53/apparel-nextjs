"use client";
// module
import { useState, Fragment, FC } from 'react';
// comp
import { Product_basecat_header } from '@/components/products/basecat/header';
import { Dynamic_Navbar } from '@/components/products/basecat/dynamic_navbar';
import { Section } from '@/components/shared/section';
import { Product_List } from '@/components/products/basecat/product_list';
import { Backdrop } from '@/components/shared/backdrop';
// style
import classes from '@/styles/products/basecat/page.module.css';
// types
import { ty_page_params } from '@/types/general.type';
import { ty_product_filter_data_list, ty_product_item } 
from '@/types/products.type';

interface IComp {
  basecat: string;
  searchParams: ty_page_params;
  filter_data: ty_product_filter_data_list | null;
  product_list: ty_product_item[] | null;
}


export const Client_Contnet: FC<IComp> = ({ 
  searchParams, basecat, filter_data, product_list 
}) => {

  const [menu_isOpen, setMenu_isOpen] = useState(false);


  return (
    <Fragment>

      {/* =========================== page header =========================== */}
      <Product_basecat_header 
        setMenu_isOpen={setMenu_isOpen}
        searchParams={searchParams}
        basecat={basecat}
        additional_data={
          (filter_data && filter_data.additional[0]) ?
          filter_data.additional[0]: null
        }
      />

      <Section>

        <div className={classes.content} >

          <div className={classes.filterBar_container} >
            <Dynamic_Navbar params={searchParams} filter_data={filter_data} />
          </div>

          {
            menu_isOpen &&
            (
              <Backdrop
                close={() => setMenu_isOpen(false)}
                blur={true}
              >
                <div className={classes.filterBar_mobile} >
                  <Dynamic_Navbar params={searchParams} filter_data={filter_data} />
                </div>
              </Backdrop>
            )
          }

          <div className={classes.products_container} >
            <Product_List list={product_list} />
          </div>
          

        </div>

      </Section>

    </Fragment>
  )

};