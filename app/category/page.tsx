import { Fragment } from 'react';
import { Page_Header } from '@/components/shared/page_header';
import classes from '@/styles/category/page.module.css';
import { dashboard_baseCategory_list } from '@/dashboard/categories/baseCategory_list';
import { Category_Item } from '@/components/category/category_item';
import { Section } from '@/components/shared/section';


export default function CategoryPage() {

  return (
    <Fragment>

      <Page_Header
        title="Shop Our Categories"
        nav_list={[{ label: 'category', link: null }]}
      />

      <Section>
        <div className={classes.item_list}>

          {
            dashboard_baseCategory_list.map(el =>
              <Category_Item 
                key={el.name} {...el} 
                href={`/category/${el.name}`}
              />
            )
          }

        </div>
      </Section>

    </Fragment>
  )

}
