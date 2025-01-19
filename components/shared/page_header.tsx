import { FC, ReactNode } from 'react';
import { cls_join } from '@/functions/cls_join.func';
// comp
import { Typo } from './typography';
import { NextLink } from './link';
import { Section } from './section';
// icons
import { Icon_Home } from '../icons/home';
import { Icon_Arrow_Right_Thin } from '../icons/arrow_right_thin';
// style
import classes from '@/styles/shared/page_header.module.css';
// types
import { ty_page_header_nav_item } from '@/types/general.type';

interface IComp {
  children?: ReactNode;
  nav_list: ty_page_header_nav_item[]
  title: string;
  // cls_name?: string;
  section_cls?: string;
}

export const Page_Header: FC<IComp> = ({
  title, nav_list, children, section_cls
}) => {

  let section_class = [classes.root];

  if(section_cls) {
    section_class.push(section_cls);
  }


  const renderNavList = () => {


    let list = nav_list.map(el => {

      if(el.link) {
        return (
          <NextLink 
            href={el.link}
            key={el.link}
          >
            <Typo
              txt={el.label}
              clsName={classes.title_div_nav_item}
            />
          </NextLink>
        )
      }
      return (
        <Typo
          key={el.link}
          txt={el.label}
          clsName={cls_join([
            classes.title_div_nav_item, classes.title_div_nav_item_active
          ])}
        />
      )

    });

    list = [
      <NextLink
        href="/"
        key="nav_home"
        Sx={{display: 'flex', alignItems: 'center'}}
      >
        <Icon_Home fill="var(--color_white)" scale={0.7} />
        <Typo
          txt="Home"
          clsName={classes.title_div_nav_item}
          margin="0 0 0 0.5rem"
        />
      </NextLink>,

      ...list
    ];

    const final_list: JSX.Element[] = [];

    list.forEach((el, idx) => {

      final_list.push(el);

      if(idx < list.length-1) {

        final_list.push(

          <div 
            key={`br_${idx}`}
            style={{
              transform: 'translateY(0.1rem)',
            }}
          >
            <Icon_Arrow_Right_Thin 
              fill="var(--color_white)"
              scale={0.4}
            />
          </div>

        )

      }

    })

    return final_list;

  }

  return (
    <Section section_cls={cls_join(section_class)}
    >

      <div className={classes.title_div}>

        <Typo 
          txt={title} 
          variant="h2"
          definedColor="white"
          weight={500}
          size="2.5rem"
        />

        <div className={classes.title_div_nav}>

          {renderNavList()}

        </div>

      </div>

      {children}

    </Section>
  )

};