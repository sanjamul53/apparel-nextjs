"use client";
import { useState, FC, Fragment } from 'react';
import { ty_primary_offer_product_item } from '@/types/primary_page.type';
import { Offer_Product_Item } from './product_item';
import classes from '@/styles/primary/offer_products/offer_products.module.css';
import { IconButton } from '@/components/shared/button/icon_button';
import { Icon_Arrow_Left } from '@/components/icons/arrow_left';
import { Icon_Arrow_Right } from '@/components/icons/arrow_right';
import { cls_join } from '@/functions/cls_join.func';
import { Section } from '@/components/shared/section';
import { NextImage } from '@/components/shared/nextImage';


interface IComp {
  productList: ty_primary_offer_product_item[];
}

const iconScale = 20;

export const Offer_Products: FC<IComp> = ({ productList }) => {

  const [currentIndex, setCurrentIndex] = useState(0);


  const leftHanlder = () => {
    currentIndex === 0 ? setCurrentIndex(productList.length - 1) :
      setCurrentIndex(currentIndex - 1);
  }

  const rightHanlder = () => {
    currentIndex === productList.length - 1 ? setCurrentIndex(0) :
      setCurrentIndex(currentIndex + 1);
  }


  return (
    <Fragment>

      <Section
        section_cls={classes.banner_section}
      >
        <NextImage src="/images/primary/offer_banner.webp" alt="offer banner"
          width={1260} height={330}
        />
      </Section>

      <div className={classes.container}>

        <div className={classes.slider}>

          {
            productList.map(el => (

              <div key={el._id} className={classes.slideContent}
                style={{
                  transform: `translateX(${currentIndex * (-100)}%)`,
                  flexBasis: '100%'
                }}
              >

                <Offer_Product_Item item={el} />

              </div>

            ))
          }

        </div>

        <IconButton onClick={leftHanlder}
          clsName={cls_join([classes.hanlder_btn, classes.handler_left])}
        >
          <Icon_Arrow_Left dimension={iconScale} fill="var(--color_slate_blue)" />
        </IconButton>

        <IconButton onClick={rightHanlder}
          clsName={cls_join([classes.hanlder_btn, classes.handler_right])}
        >
          <Icon_Arrow_Right dimension={iconScale} fill="var(--color_slate_blue)" />
        </IconButton>


      </div>

    </Fragment>
  )

};