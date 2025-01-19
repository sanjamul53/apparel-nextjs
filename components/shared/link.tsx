import { CSSProperties, FC, ReactNode } from 'react';
import Link from 'next/link';

interface IComp {
  href: string;
  newTab?: boolean;
  children: ReactNode
  clsName?: string;
  Sx?: CSSProperties;
}

export const NextLink: FC<IComp> = ({ href, newTab, Sx, children, clsName }) => {

  let customStyle: CSSProperties = {
    color: 'var(--color_txt)',
    textDecoration: 'none', 
    width: '100%',
    display: 'block',
  }

  if(Sx) {
    customStyle = {
      ...customStyle,
      ...Sx
    }
  }

  if(newTab) {

    return (
      <Link 
        href={href} 
        style={customStyle}
        className={clsName||''}
        target="_blank"
        rel="noopener noreferrer"
      >
  
        {children}
  
      </Link>
    )

  }

  return (
    <Link 
      href={href} 
      style={customStyle}
      className={clsName||''}
    >

      {children}

    </Link>
  )

};