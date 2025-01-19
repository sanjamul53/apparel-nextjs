import { cls_join } from '@/functions/cls_join.func';
import { Section } from '../shared/section';
import { NextImage } from '../shared/nextImage';
import { Typo } from '../shared/typography';
import classes from '@/styles/primary/header.module.css';


export const Header = () => {


  return (
    <Section
      section_cls={cls_join([classes.header, classes.bg_color])}
    >
      <div className={classes.container} >

        {/* ==================== text div ==================== */}
        <div className={classes.txt_div} >

          <Typo variant="h4" color="var(--color_white)"
            txt="Has just arrived!"
          />

          <Typo variant="h1" 
            color="var(--color_white)"
            txt="Your Signature Style Awaits"
            size="5rem" margin="1.5rem 0 0 0"
            Sx={{ lineHeight: 1 }}
          />


          <p className={classes.description}>
            is a great spot to find classic, timeless pieces for men, women and kids.
            From comfy joggers and denim jeans to stylish blouses and dress shirts,
            you’ll find everything you need for a polished wardrobe.
          </p>

          <div className={classes.number_counts}>

            <div className={classes.count_item}>

              <p className={classes.count_item_num}>
                980+
              </p>

              <p className={classes.count_item_txt}>
                Total Available Products
              </p>

            </div>


            <div className={classes.count_item}>

              <p className={classes.count_item_num}>
                10+
              </p>

              <p className={classes.count_item_txt}>
                Years of Experience
              </p>

            </div>


          </div>

        </div>

        {/* ==================== background image div ==================== */}
        <div className={classes.img_div}>

          <NextImage alt="header img"
            src="/images/primary/header_bg.jpg"
            width={600} height={700}
          />

        </div>

      </div>
    </Section>
  )

};


// https://dribbble.com/shots/23232120-Ecommerce-Website-Template-Design