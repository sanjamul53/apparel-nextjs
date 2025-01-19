import { FC } from 'react';
import { query_profile_getOne } from '@/lib/react_query/query/profile';
import { Spinner_Page } from '../shared/spinner/page';
import { Page_Message } from '../shared/page_message';
import classes from '@/styles/dashboard/profile.module.css';
import { Typo } from '../shared/typography';

interface IComp {
  userId: string;
}

export const Dashboard_Profile: FC<IComp> = ({ userId }) => {

  const { status, data } = query_profile_getOne({ user_id: userId });

  
  if (status === 'pending') {
    return <Spinner_Page />
  }

  if (status === 'error' || !data) {
    return <Page_Message msg="Failed to get profile" />
  }

  return (
    <div className={classes.root}>

      <div className={classes.img_email_div}>

          <img src={data.image} className={classes.img} />

        <Typo txt={data.email} variant="h5"
          margin="0 0 0 2rem" color="var(--color_blue_black)"
        />

      </div>

      <Typo txt={`Hello ${data.name}`} variant="h3"
        margin="5rem 0 0 0" align="center"
      />

    </div>
  )

};