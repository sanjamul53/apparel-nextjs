import { CSSProperties, FC } from 'react';
import Image from 'next/image';

interface IComp {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  // parentWidth?: string;
  parentHeight?: string;
  parentCss?: CSSProperties,
  Sx?: CSSProperties
  without_placeholder?: boolean;
  clsName?: string;
}


export const NextImage: FC<IComp> = ({ 
  src, alt, width, height, parentHeight, parentCss, 
  Sx, without_placeholder, clsName
}) => {

  if(!width && !height && !parentHeight) {
    return <p> provide height-width or parentHeight </p>
  }

  if(width && height) {

    return (
        <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder={without_placeholder? 'empty': 'blur'}
        blurDataURL="/images/blur_img.webp"
        quality={100}
        style={{
          maxWidth: '100%',
          height: 'auto'
        }}
        className={clsName||''}
      />
    )

  }

  return (
    <div style={{
      position: 'relative',
      // width: parentWidth ? parentWidth: '100%', 
      width: '100%',
      height: parentHeight? parentHeight: '100%', 
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      ...(parentCss && parentCss)
    }}
    >
      <Image
        src={src}
        alt={alt}
        fill={true}
        placeholder={without_placeholder? 'empty': 'blur'}
        blurDataURL="/images/blur_img.webp"
        quality={100}
        sizes="100vw"
        style={{objectFit: 'contain'}}
        className={clsName||''}
      />
    </div>
  )

};