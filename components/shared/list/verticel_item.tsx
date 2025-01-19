import { FC } from 'react';
import { Typo } from '../typography';

interface IComp {
  label: string;
  value: string|number;
}

export const ListItem_Verticel: FC<IComp> = ({ label, value }) => {

  return (
    <div
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
    >

      <Typo txt={label} size="1.4rem" align="center" />

      <Typo txt={value} size="1.7rem" align="center"
        margin="0.6rem 0 0 0"
        color="var(--color_slate_blue)"
      />

    </div>
  )

};