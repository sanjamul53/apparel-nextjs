"use client";
import { useState, useEffect, FC } from 'react';
import { Typo } from '@/components/shared/typography';
import { NextImage } from '@/components/shared/nextImage';
import classes from '@/styles/primary/cat_products/cat_products.module.css';

// types
import { cls_join } from '@/functions/cls_join.func';
import { NextLink } from '@/components/shared/link';
import { useWindow } from '@/hooks/useWindow';
import { ty_primary_byCategory_item } from '@/dashboard/primary_page/byCategories';


interface IComp {
  catItem: ty_primary_byCategory_item
}

export const Category_List: FC<IComp> = ({ catItem }) => {

  const [catList, setCatList] = useState([...catItem.subCatList]);
  const { windowWidth } = useWindow();

  // ================ reduct category items in small screen ================
  useEffect(() => {

    if(windowWidth <= 450) {
      const newList = catItem.subCatList.slice(0, 3);
      setCatList([...newList]);
    }
    else {
      setCatList([...catItem.subCatList]);
    }

  }, [windowWidth]);


  return (
    <div className={classes.cat_root}>

      <div className={cls_join([classes.title_div, classes.item_width])}>

        <Typo txt={catItem.title}
          variant="h4" color="var(--color_black)"
        />

        <Typo txt={catItem.subtitle}
          margin="1rem 0 0 0" color="var(--color_black)"
        />

        {
          catItem.href && (
            <div style={{marginTop: '1.5rem', display: 'flex'}}>
              <NextLink href={catItem.href} clsName={classes.base_link} >
                  Visit Shop
              </NextLink>
            </div>
          )
        }

      </div>

      {
        catList.map(item => (
          <div key={item.title}
            className={cls_join([classes.cat_div, classes.item_width])}
          >

            <div className={classes.cat_div_content}>

              <NextLink href={item.href}>

                <div className={classes.cat_img}>
                  <NextImage src={item.img} alt="cat"
                    width={430} height={573}
                  />
                </div>

                <Typo
                  txt={item.title} color="var(--color_black)" align="center"
                  weight={500} margin="1.5rem 0 0 0"
                  clsName={classes.cat_txt}
                />

              </NextLink>

            </div>


          </div>
        ))
      }

    </div>
  )

};