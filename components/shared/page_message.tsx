import { CSSProperties, FC, ReactNode } from 'react';
import { Typo } from './typography';

interface IComp {
  msg?: string;
  children?: ReactNode;
}

const style: CSSProperties = {
  minHeight: '100vh',
}

export const Page_Message: FC<IComp> = ({ msg, children }) => {

  return (
    <div>

      {
        msg &&
        <Typo
          txt={msg} variant="h4" align="center"
          margin="5rem 0 0 0"
        />
      }

      {children}


    </div>
  )

};