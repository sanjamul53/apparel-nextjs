import { FC } from 'react';
import classes from '@/styles/category/category_item.module.css';
import { NextImage } from '../shared/nextImage';
import { NextLink } from '../shared/link';
import { Typo } from '../shared/typography';

interface IComp {
  label: string;
  img: string;
  href: string;
}

export const Category_Item: FC<IComp> = ({ label, img, href  }) => {


  return (
    <div className={classes.root}>
      <div className={classes.container}>

        <NextLink href={href}>

          <div className={classes.img_div}>
            <NextImage src={img} alt="prod img"
              width={350} height={350}
            />
          </div>

          <div className={classes.label_txt_div}>
            <Typo
              txt={label} clsName={classes.label_txt}
              variant="h4" align="center"
              margin="2rem 0 0 0" size="2rem" color="var(--color_black)"
            />
          </div>

        </NextLink>

      </div>
    </div>
  )

};