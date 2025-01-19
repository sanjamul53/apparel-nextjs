import React, { Fragment } from 'react';
import classes from '@/styles/layout/footer.module.css';
import { Section } from '../shared/section';
import { Icon_Instagram } from '../icons/social_instagram';
import { Icon_Youtube } from '../icons/social_youtube';
import { Icon_Twitter } from '../icons/social_twitter';
import { Icon_Facebook } from '../icons/social_facebook';
import { Typo } from '../shared/typography';
import { NextLink } from '../shared/link';
import { NextImage } from '../shared/nextImage';
import { Icon_Email } from '../icons/email';
import { Icon_Global } from '../icons/global';
import { ty_comp_icon } from '@/types/component';


type T_devItem = {
  type: string;
  label: string;
  icon: React.FC<ty_comp_icon>;
  href: string | null;
}

const iconList = [
  { icon: Icon_Instagram, link: 'https://www.instagram.com/' },
  { icon: Icon_Youtube, link: 'https://www.youtube.com/' },
  { icon: Icon_Twitter, link: 'https://twitter.com/' },
  { icon: Icon_Facebook, link: 'https://www.facebook.com/' },
];

const storeList = [

  {
    name: 'apple', img: '/images/footer/store_apple.png',
    href: 'https://www.apple.com/app-store/'
  },
  {
    name: 'google', img: '/images/footer/store_google.png',
    href: 'https://www.apple.com/app-store/'
  }

];


const devList: T_devItem[] = [

  {
    type: 'Email', label: 'nayeem0e5@gmail.com', icon: Icon_Email,
    href: null
  },

  {
    type: 'Porfolio', label: 'Portfolio', icon: Icon_Global,
    href: 'https://bornona.vercel.app/'
  },

]


export const Footer = () => {


  const renderDevItem = (item: T_devItem) => {

    return (
      <Fragment>
        <div style={{ display: 'flex', justifyContent: 'center' }} >
          <item.icon fill="#2d2d2d" />
        </div>

        <Typo txt={item.label} weight={500}
          align="center" margin="0.5rem 0 0 0"
          color="#2d2d2d"
        />
      </Fragment>
    )

  }


  return (
    <Section
      section_cls={classes.section_cls}
      content_cls={classes.sectionContent}
    >

      {/* ========================= content root ========================= */}

      <div className={classes.content_root}>

        {/* ------------- social div ------------- */}
        <div className={classes.social_div}>

          <h3 className={classes.social_txt}>
            i’m lovin’ it
            <sup>  <span> ® </span> </sup>
          </h3>

          <div className={classes.social_iconList}>
            {
              iconList.map((el, idx) => (
                <NextLink href={el.link} newTab
                  key={`social_icon_${idx}`}
                >
                  <el.icon scale={1.6} fill="#2d2d2d" />
                </NextLink>
              ))
            }
          </div>

        </div>

        {/* ------------- app div ------------- */}
        <div className={classes.app_div}>

          <Typo txt="Order. Earn. Enjoy." variant="h4"
            color="#2d2d2d" weight={900}
          />

          <Typo txt="Download our app" variant="h5"
            weight={900} margin="2rem 0 0 0"
          />

          <div className={classes.store_container}>

            {
              storeList.map(el => (
                <NextLink href={el.href} key={el.name}
                  Sx={{ flex: '0 0 14rem' }} newTab
                >
                  <NextImage src={el.img} alt={el.name}
                    width={135} height={45}
                  />
                </NextLink>
              ))
            }

          </div>

          <p className={classes.store_description}>
            Apple and the Apple logo are trade marks of Apple Inc.,
            registered in the U.S. and other countries.
            App Store is a service mark of Apple Inc.,
            registered in the U.S. and other countries.
            Google Play and the Google Play logo are trade marks of Google LLC.
          </p>


        </div>

      </div>

      {/* ========================= dev root ========================= */}

      <div className={classes.dev_root}>

        {
          devList.map(el => (
            <div key={el.type} className={classes.dev_item}>

              {
                el.href ?
                  (
                    <NextLink href={el.href} newTab >
                      {renderDevItem(el)}
                    </NextLink>
                  ) :
                  renderDevItem(el)
              }



            </div>
          ))
        }

      </div>

    </Section>
  )

};