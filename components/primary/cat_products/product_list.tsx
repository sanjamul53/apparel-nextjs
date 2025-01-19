"use client";
// module
import { useState, useEffect, FC } from 'react';
// comp
import { Product_List_Item } from '../../products/list_item';
import { IconButton } from '@/components/shared/button/icon_button';
import { Icon_Arrow_Right } from '@/components/icons/arrow_right';
import { Icon_Arrow_Left } from '@/components/icons/arrow_left';
// styles
import classes from '@/styles/primary/cat_products/product_list.module.css';
// types
import { ty_product_item } from '@/types/products.type';
import { useWindow } from '@/hooks/useWindow';
import { Typo } from '@/components/shared/typography';

interface IComp {
  products: ty_product_item[];
}

const button_style = {
  backgroundColor: 'transparent', border: 'none',
  padding: '1rem'
}

export const Primary_Product_List: FC<IComp> = ({ products }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [productList, setProductList] = useState<ty_product_item[][]>(() => {

    let list = [products.slice(0, 8)];

    if (products.length > 8) {
      list.push(products.slice(8, 16))
    }

    return list;

  });

  const { windowWidth } = useWindow();

  // =================== reduce product in small screen ===================
  useEffect(() => {

    let total_num = 8;

    if(windowWidth <= 900) {
      total_num = 6;
    }

    let list = [products.slice(0, total_num)];

    if (products.length > total_num) {
      list.push(products.slice(total_num, total_num*2))
    }

    setProductList([...list]);

  }, [windowWidth]);


  // // arrange product list
  // let productList = [
  //   products.slice(0, 8)
  // ];
  // if (products.length > 8) {
  //   productList.push(products.slice(8, 16))
  // }

  const leftHanlder = () => {
    setCurrentIndex(0);
  }

  const rightHanlder = () => {
    setCurrentIndex(1);
  }


  return (
    <>

      {/* ============================= icon section ============================= */}

      <div className={classes.title_div}>

        <div className={classes.title_line}></div>

        <Typo
          txt="TOP PRODUCTS" variant="h5"
          clsName={classes.title_txt} weight={300}
          size="1.5rem"
        />


        {
          productList.length > 1 && (
            <div className={classes.icon_div}>

              <IconButton
                onClick={leftHanlder}
                disabled={currentIndex === 0}
                variant="text"
                Sx={{ marginRight: '2rem', ...button_style }}
              >
                <Icon_Arrow_Left
                  dimension={12}
                  fill={currentIndex === 0 ? '#ccc': "var(--color_slate_blue)"}
                  Sx={{padding: '0.8rem'}}
                />
              </IconButton>


              <IconButton
                onClick={rightHanlder}
                disabled={currentIndex === 1}
                variant="text"
                Sx={button_style}
              >
                <Icon_Arrow_Right
                  dimension={12} 
                  fill={currentIndex === 1 ? '#ccc': "var(--color_slate_blue)"}
                  Sx={{padding: '0.8rem'}}
                />
              </IconButton>

            </div>
          )
        }
      </div>




      {/* ============================= product section ============================= */}
      <div className={classes.product_list_div}>

        <div className={classes.products_carousel}>

          {/* =============== carousel_item =============== */}
          {
            productList.map((products, idx) => (
              <div key={idx} className={classes.carousel_item}
                style={{
                  transform: `translateX(${currentIndex * (-100)}%)`,
                }}
              >

                {
                  // ========= products
                  products.map(el => (
                    <div key={el._id} className={classes.product_item}>
                      <Product_List_Item item={el} />
                    </div>
                  ))
                }


              </div>

            ))
          }

        </div>

      </div>

    </>
  )

};