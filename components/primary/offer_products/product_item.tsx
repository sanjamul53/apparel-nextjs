import { useState, useEffect, FC, Fragment } from 'react';
import { ty_primary_offer_product_item } from '@/types/primary_page.type';
import classes from '@/styles/primary/offer_products/product_item.module.css';
import { Section } from '@/components/shared/section';
import { NextImage } from '@/components/shared/nextImage';
import { ssactive_img } from '@/functions/ssactive_img.func';
import { cls_join } from '@/functions/cls_join.func';
import { Typo } from '@/components/shared/typography';
import { Button } from '@/components/shared/button/button';
import { NextLink } from '@/components/shared/link';
import { product_detail_url_generator } from '@/functions/product_detail_url.func';

interface IComp {
  item: ty_primary_offer_product_item;
}

const default_timer = {
  day: 0,
  hour: 0,
  minute: 0,
  second: 0
}

export const Offer_Product_Item: FC<IComp> = ({ item }) => {

  const [countDown, setCountDown] = useState({ ...default_timer });

  // handle coutdown timer
  useEffect(() => {


    let endDate: null | Date = null;

    new Date().getTime();

    if (item.sale_end_date) {
      endDate = new Date(
        new Date().getTime() + 
        (item.sale_end_date * 86400* 1000)
      );

    }

    const timerHandler = () => {

      if (!endDate) return null;

      const current_time = new Date().getTime();
      const end_timer = endDate.getTime();

      // get time difference in second
      let delta = Math.abs(end_timer - current_time) / 1000;

      // calculate days
      const days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      const hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      const minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      // calculate second
      const seconds = Math.floor(delta % 60);

      setCountDown({
        day: days,
        hour: hours,
        minute: minutes,
        second: seconds
      })

    }

    const timer = setInterval(timerHandler, 1000);

    return () => {
      clearInterval(timer);
    }

  }, []);


  const countdownTime = (value: number, key: string) => {

    return (
      <Fragment>

        <p className={classes.countdown_item_value}>
          {value < 10 ? `0${value}` : value}
        </p>

        <p className={classes.countdown_item_key}>
          {key}
        </p>

      </Fragment>
    )

  }


  return (
    <Section without_horizontal_Padding={true}
      section_cls={classes.sectionCls}
    >
      <div className={classes.root}>

        {/* ======================= image div ======================= */}
        <div className={cls_join([classes.img_div, classes.root_item_div])}>

          <div className={classes.img_content}>

            <NextImage
              src={ssactive_img({ src: item.image_variation, size: 'md' })}
              alt="product image"
              width={400} height={500}
            />

            <div className={classes.price_offer_div}>
              <Typo txt={`${item.offer}% OFF`} 
                align="center" color="var(--color_white)"
                weight={700}
              />
            </div>


          </div>



        </div>

        {/* ======================= txt div ======================= */}
        <div className={cls_join([classes.txt_div, classes.root_item_div])}>

          <div className={classes.txt_content}>

            <Typo
              txt={item.offer_title || "DEAL OF THE WEEK"}
              variant="h5"
              color="var(--color_primary)"
            />

            <Typo
              txt={item.name}
              variant="h3"
              color="var(--color_slate_blue)"
              margin="2rem 0 0 0"
            />

            {/* ========================== countdown ========================== */}
            <div className={classes.countdown_content}>

              <div className={classes.countdown_item}
                style={{ alignItems: 'flex-start' }}
              >
                {countdownTime(countDown.day, 'Days')}

              </div>

              <div className={classes.countdown_space}> : </div>

              <div className={classes.countdown_item}>
                {countdownTime(countDown.hour, 'Hours')}
              </div>

              <div className={classes.countdown_space}> : </div>

              <div className={classes.countdown_item}>
                {countdownTime(countDown.minute, 'Minutes')}
              </div>

              <div className={classes.countdown_space}> : </div>

              <div className={classes.countdown_item}
                style={{ alignItems: 'flex-end' }}
              >
                {countdownTime(countDown.second, 'Seconds')}
              </div>

            </div>
            {/* ========================== button ========================== */}

            <div className={classes.btn_div} >

              <NextLink
                href={product_detail_url_generator({
                  id: item._id, name: item.name
                })}
              >

                <Button
                  Sx={{width: '100%', maxWidth: '20rem'}}
                >
                  Shop Now
                </Button>
              </NextLink>
            </div>



          </div>
        </div>



      </div>
    </Section>
  )

};