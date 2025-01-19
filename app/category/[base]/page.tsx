import { Fragment } from 'react';
import { Page_Header } from '@/components/shared/page_header';
import classes from '@/styles/category/page.module.css';
import { Section } from '@/components/shared/section';
import { ty_page_url } from '@/types/general.type';
import { NextLink } from '@/components/shared/link';
import { dashobard_subCategory_list } from '@/dashboard/categories/subCategory_list';
import { Category_Item } from '@/components/category/category_item';
import { product_baseCategory_List } from '@/data/product/categories';
import { cat_key_to_label } from '@/functions/cat_lableKey_convert.func';


export default function CategoryPage({ params }: ty_page_url) {

  const baseCat = params.base;

  const targetBaseCategory = dashobard_subCategory_list[baseCat];

  if (!targetBaseCategory) return null;

  // get base category label
  let baseCat_label = cat_key_to_label(baseCat) || '';


  // baseCat.split('_').forEach(el => {

  //   const currentStr = el.charAt(0).toUpperCase() + el.slice(1);

  //   baseCat_label = `${baseCat_label} ${currentStr}`;

  // });


  return (
    <Fragment>

      <Page_Header
        title={`${baseCat_label} Categories`}
        nav_list={[
          { label: 'category', link: '/category' },
          { label: baseCat_label, link: null }
        ]}
      >

        <div style={{ marginTop: '2rem' }} >

          {
            product_baseCategory_List.includes(baseCat) &&
            (
              <NextLink href={`/products/${baseCat}`} >
                <button className={classes.page_header_btn}>
                  All {baseCat_label}
                </button>
              </NextLink>
            )
          }


        </div>

      </Page_Header>

      <Section>
        <div className={classes.item_list}>

          {
            targetBaseCategory.map((el, idx) => {

              let href = `/products/${el.baseCat}?`;

              if (el.collar) {
                href = `${href}collar=${el.collar}&`;
              }
              if (el.feature) {
                href = `${href}feature=${el.feature}&`;
              }
              if (el.fit) {
                href = `${href}fit=${el.fit}&`;
              }
              if (el.sleeve_length) {
                href = `${href}sleeve_length=${el.sleeve_length}&`;
              }
              if (el.thickness) {
                href = `${href}thickness=${el.thickness}&`;
              }
              if (el.types) {
                href = `${href}type=${el.types}&`;
              }

              return (
                <Category_Item
                  key={`${baseCat}_${idx}`} {...el}
                  href={href}
                />
              )

            })
          }

        </div>
      </Section>

    </Fragment>
  )

}
