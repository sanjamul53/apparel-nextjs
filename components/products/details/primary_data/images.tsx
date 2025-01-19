import { FC, Dispatch, SetStateAction  } from 'react';
import classes from '@/styles/products/details/primary_data/product_images.module.css';
import { NextImage } from '@/components/shared/nextImage';
import { ssactive_img } from '@/functions/ssactive_img.func';
import { Img } from '@/components/shared/image';

interface IComp {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  list: string[];
}

export const Product_Images: FC<IComp> = ({ selected, list, setSelected }) => {

  return (
    <div className={classes.root}>

      <div className={classes.list_container}>
        {
          list.map(el => {

            let img_src = ssactive_img({ src: el, size: 'xs' });

            return (
              <div key={el} className={classes.list_item}
                style={{ ...(selected === el && { borderColor: 'var(--color_primary)' }) }}
                onClick={()=> setSelected(el)}
              >
                <Img
                  src={img_src}
                  alt="img"
                  width={70}
                  Sx_defaultImg={{ padding: '0.8rem' }}
                />
                {/* <NextImage
                  src={img_src}
                  alt="img"
                  height={88}
                  width={70}
                /> */}
              </div>
            )

          })
        }
      </div>

      <div className={classes.slected_container}>
        <Img
          src={ssactive_img({ src: selected, size: 'md' })}
          alt="primary"
          width={450}
          Sx_defaultImg={{ padding: '3rem' }}
        />
        {/* <NextImage
          src={ssactive_img({ src: selected, size: 'md' })}
          alt="primary"
          width={450}
          height={563}
        /> */}
      </div>


    </div>
  )

};