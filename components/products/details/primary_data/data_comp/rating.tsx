import { FC } from 'react';
// classes
import { Icon_Star_Empty } from '@/components/icons/star_empty';
import { Icon_Star_Fill } from '@/components/icons/star_fill';
import { Icon_Star_Half } from '@/components/icons/star_half';
import { Typo } from '@/components/shared/typography';
import classes from 
'@/styles/products/details/primary_data/data_comp/rating.module.css';

interface IComp {
  rating_quantity: number;
  rating_sum: number;
}

const STAR_DIMENSION = 16;

const STAR_SCALE = 1;

export const Rating: FC<IComp> = ({ rating_quantity, rating_sum }) => {

  let rating_number = 0;
  if (rating_quantity > 0) {
    const rating_clc = rating_sum / rating_quantity;
    rating_number = Number(parseFloat(`${rating_clc}`).toFixed(1));
  }

  // ================= render full star =================
  const render_fullStar = () => {

    let start_list: JSX.Element[] = [];

    for (let i = 1; i <= Math.floor(rating_number); i++) {
      start_list.push(
        <Icon_Star_Fill
          scale={STAR_SCALE}
          dimension={STAR_DIMENSION}
          key={`star_fill_${i}`}
          clsName={classes.start_item}
          // fill="#fea569"
          fill="var(--color_blue_black)"
        />
      )
    }

    return start_list;

  }


  // ================= render half star =================
  const render_halfStar = () => {

    if ((rating_number - Math.floor(rating_number)) > 0) {
      return (
        <Icon_Star_Half
          scale={STAR_SCALE}
          dimension={STAR_DIMENSION}
          clsName={classes.start_item}
          fill="var(--color_blue_black)"
        />
      )
    }

    return null;

  }

  // ================= render empty star =================
  const render_emptyStar = () => {

    const remain_star = 5 - Math.ceil(rating_number);

    if (remain_star === 0) return null;

    let start_list: JSX.Element[] = [];

    for (let i = 1; i <= remain_star; i++) {
      start_list.push(
        <Icon_Star_Empty
          scale={STAR_SCALE}
          dimension={STAR_DIMENSION}
          key={`star_empty_${i}`}
          clsName={classes.start_item}
          fill="var(--color_blue_black)"
        />
      )
    }

    return start_list;
  }



  if (rating_number === 0) return null;

  return (
    <div className={classes.root}>

      <div className={classes.star_container}>
        {render_fullStar()}
        {render_halfStar()}
        {render_emptyStar()}
      </div>

      <Typo
        txt={`(${rating_number})`}
        margin="0 0 0 0.5rem"
        size="1.4rem"
      />

      <Typo
        txt="/"
        margin="0 0.5rem"
        size="1.7rem"
        weight={500}
      />

      <Typo
        txt={`${rating_quantity} Ratings`}
        margin="0"
        size="1.4rem"
      />



    </div>
  )
};