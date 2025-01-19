"use client";
import { useState, FC } from 'react';
// comp
import { Product_Data, TL_selected_color } from './data';
import { Product_Images } from './images';
import { Section } from '@/components/shared/section';
import { ty_product_one_detail } from '@/types/products.type';
// classes
import classes from '@/styles/products/details/primary_data/primary_data.module.css';


interface IComp {
  product: ty_product_one_detail;
  default_img_list: string[];
  default_color: TL_selected_color|null;
}

export const Primary_Data: FC<IComp> = ({ 
  product, default_img_list, default_color 
}) => {

  const [current_img, setCurrent_img] = useState(default_img_list[0]);
  const [img_list, setImg_list] = useState<string[]>([...default_img_list]);

  return (
    <Section>
      <div className={classes.root}>

        <div className={classes.img_container}>

          <Product_Images
            selected={current_img}
            setSelected={setCurrent_img}
            list={img_list}
          />
          
        </div>

        <div className={classes.data_container}>

          <Product_Data
            product={product}
            setCurrent_img={setCurrent_img}
            setImg_list={setImg_list}
            default_color={default_color}
            current_img={current_img}
          />

        </div>


      </div>
    </Section>
  )

};