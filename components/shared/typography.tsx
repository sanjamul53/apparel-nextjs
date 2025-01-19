import { CSSProperties, FC } from 'react';

type TfontWeight = 300| 400| 500| 700| 900;

interface IComp {
  txt: string | number;
  definedColor?: 'primary'| 'secondary'| 'blue_gray'| 'white';
  is_transparent?: boolean;
  color?: string| 'transparent';
  size?: string;
  align?: "left" | "center" | "right";
  margin?: string;
  // dotted?: boolean,
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p',
  weight?: TfontWeight;
  Sx?: CSSProperties
  clsName?: string;
  onClick?: ()=> void;
}

export const Typo: FC<IComp> = 
({ 
  txt, Sx, definedColor, color, is_transparent, variant, size, 
  weight, margin, align, clsName, onClick 
}) => {

  let sz = '1.5rem';
  let wt: TfontWeight = 400;
  // let mg = margin ? margin: '0 0 1rem 0';
  let mg = margin ? margin: '0';
  let txtAlign = align ? align: 'left';
  let spacing = '0.00938em';
  let lineHt = 1.5;

  let txtColor: string|null = 'var(--color_txt)';

  if(is_transparent === true) {
    txtColor = null;
  }
  else if(color) {
    txtColor = color;
  }
  else if(definedColor === 'primary') {
    txtColor = 'var(--color_primary)';
  }
  else if(definedColor === 'secondary') {
    txtColor = 'var(--color_secondary)';
  }
  else if(definedColor === 'blue_gray') {
    txtColor = 'var(--color_blue_gray)';
  }
  else if(definedColor === 'white') {
    txtColor = 'var(--color_white)';
  }

  switch(variant) {

    case undefined:
      // sz = '1.5rem';
      // wt = 400;
      break;
    case 'p':
      sz = '1.5rem';
      wt = 400;
      break;
    case 'h1':
      sz = '4rem';
      wt = 700;
      spacing = '-0.01562em';
      break;
    case 'h2':
      sz = '3.5rem'
      wt = 700;
      spacing = '-0.00833em';
      break;
    case 'h3':
      sz = '3rem'
      wt = 500;
      spacing = '0em';
      break;
    case 'h4':
      sz = '2.2rem'
      wt = 500;
      spacing = '0.00735em';
      break;
    case 'h5':
      sz = '1.8rem'
      wt = 500;
      spacing = '0em';
      break;
    case 'h6':
      sz = '1.5rem'
      wt = 500;
      spacing = '0.0075em';
      break;
  }

  let txtStyle: CSSProperties = {
    fontSize: size? size: sz,
    fontWeight: weight ? weight: wt,
    textAlign: txtAlign,
    margin: mg,
    letterSpacing: spacing,
    lineHeight: lineHt,
    ...(txtColor && {color: txtColor}),
    ...(Sx ? Sx: {})
  }

  const txtElRender = () => {

    switch(variant) {

      case undefined:
        return <p style={txtStyle} className={clsName||''} > {txt} </p>;

      case 'h1':
        return <h1 style={txtStyle} className={clsName||''} > {txt} </h1>;

      case 'h2':
        return <h2 style={txtStyle} className={clsName||''} > {txt} </h2>;

      case 'h3':
        return <h3 style={txtStyle} className={clsName||''} > {txt} </h3>;

      case 'h4':
        return <h4 style={txtStyle} className={clsName||''} > {txt} </h4>;

      case 'h5':
        return <h5 style={txtStyle} className={clsName||''} > {txt} </h5>;

      case 'h6':
        return <h6 style={txtStyle} className={clsName||''} > {txt} </h6>;

      default:
        return <p style={txtStyle} className={clsName||''} > {txt} </p>;
    }

  }

  if(onClick) {
    return (
      <div onClick={onClick}>
        {txtElRender()}
      </div>
    )
  }

  return txtElRender();


};