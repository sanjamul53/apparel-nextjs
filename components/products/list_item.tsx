// module
import { FC } from 'react';
// comp
import { NextLink } from '../shared/link';
import { NextImage } from '../shared/nextImage';
import { Typo } from '../shared/typography';
// types
import { ty_product_item } from '@/types/products.type';
import { product_detail_url_generator }
from '@/functions/product_detail_url.func';
import { ssactive_img } from '@/functions/ssactive_img.func';
import classes from '@/styles/products/list_item.module.css';

interface IComp {
  item: ty_product_item
}

export const Product_List_Item: FC<IComp> = ({ item }) => {

  let img_src = ssactive_img({  src: item.image_variation, size: 'sm' })

  const price = item.price.min === item.price.max ? `$${item.price.min}` :
    `$${item.price.min} - $${item.price.max}`;
  ;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <NextLink
          href={product_detail_url_generator({ id: item._id, name: item.name })}
          Sx={{display: 'block'}}
        >



          <div className={classes.image_div}>
            <NextImage
              alt={item.name}
              src={img_src}
              width={200}
              height={250}
              // width={176}
              // height={220}
            />
          </div>


          <div className={classes.txt_div}>

            <Typo
              txt={item.brand}
              size="1.3rem"
              color="#7d879c"
            />

            <div className={classes.txt_name}>
              <Typo
                txt={item.name}
                size="1.5rem"
                weight={500}
                // color="#373f50"
                color="var(--color_slate_blue)"
                variant="h5"
                clsName={classes.txt_name_typo}
              />
            </div>

            <Typo
              txt={price}
              size="1.4rem"
              color="var(--color_blue_black)"
              margin="0.6rem 0 0 0"
            />

          </div>

        </NextLink>
      </div>
    </div>
  )

};