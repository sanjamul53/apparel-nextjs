"use client";
import { useNav } from '@/hooks/useNav';
import { cls_join } from '@/functions/cls_join.func';
import { Section } from '../shared/section';
import { NextImage } from '../shared/nextImage';
import { NextLink } from '../shared/link';
import { Dashboard_navigation_item } from '@/dashboard/navigation';
import classes from '@/styles/layout/header.module.css';

export const Header_Layout = () => {

  const { cart } = useNav();


  return (
    <header>
      <Section section_cls={classes.section} >
        <div className={classes.root} >

          <div className={classes.content_01}>

            <NextLink href="/" Sx={{marginRight: '2rem'}} >
              <NextImage
                src="/images/logo.png" alt="logo"
                width={65} height={30}
              />
            </NextLink>

            <NextLink 
              href={`${Dashboard_navigation_item.products}/t_shirt`}
              clsName={classes.navitem_txt}
            >
              Shop
            </NextLink>

            <NextLink href={Dashboard_navigation_item.category}
              clsName={classes.navitem_txt}
            >
              Category
            </NextLink>

          </div>

          <div className={classes.content_02}>

            <NextLink href={Dashboard_navigation_item.cart}
              clsName={cls_join([classes.navitem_icon, classes.icon_cart])}
            >
              <NextImage src="/icons/cart.png" alt="cart"
                width={35} height={35} without_placeholder={true}
              />

              {
                cart.status === 'success' && (
                  <span className={classes.icon_cart_total} >
                    {cart.totalItem}
                  </span>
                )
              }
              
            </NextLink>

            <NextLink href={Dashboard_navigation_item.auth}
              clsName={classes.navitem_icon}
            >
              <NextImage src="/icons/user.png" alt="user"
                width={20} height={20}  without_placeholder={true}
              />

            </NextLink>

          </div>


        </div>
      </Section>
    </header>
  )
};