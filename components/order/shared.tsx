import { FC } from 'react';
import { Typo } from "../shared/typography";

interface I_Section_Title {
  title: string;
}

export const Section_Title: FC<I_Section_Title> = ({title}) => {

  return (
    <Typo
      txt={title} variant="h4"
      align="center" margin="0 0 6rem 0"
    />
  )

}