import React from 'react';
import classes from '@/styles/primary/why_us.module.css';
import { Section } from '../shared/section';
import { NextImage } from '../shared/nextImage';
import { Typo } from '../shared/typography';

type T_item = {
  img: string; title: string;
}

const data_list: T_item[] = [

  {
    title: 'Endless Selection',
    img: '/images/primary/why_us/dress.png'
  },
  {
    title: 'Reasonable Pricing',
    img: '/images/primary/why_us/wallet.png'
  },
  {
    title: 'Refund on Damaged Item',
    img: '/images/primary/why_us/refund.png'
  },
  {
    title: 'Free Shipping (Conditional)',
    img: '/images/primary/why_us/shipping.png'
  },
  {
    title: 'Fit Guarantee',
    img: '/images/primary/why_us/scale.png'
  },
  {
    title: 'Happy Returns',
    img: '/images/primary/why_us/bag.png'
  }

]

export const Why_Us = () => {

  return (
    <Section section_cls={classes.section_cls}>

      <h3 className={classes.header} > Why Choose Us? </h3>

      <div className={classes.list}>

        {
          data_list.map((el, idx) => (
            <div className={classes.item} key={`primary_why_us_${idx}`} >

              <NextImage src={el.img} alt="icon"
                width={50} height={50}
              />

              <Typo txt={el.title}
                weight={300} size="1.5rem" margin="2.5rem 0 0 0"
                color="var(--color_black)" align="center"
              />

            </div>
          ))
        }

      </div>
    </Section>
  )
};