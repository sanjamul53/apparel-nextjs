"use client";
import { useState, useEffect, useRef, CSSProperties, FC } from 'react';

interface IComp {
  src: string;
  alt: string;
  width?: number;
  Sx_parent?: CSSProperties,
  Sx_img?: CSSProperties
  cls_img?: string;
  Sx_defaultImg?: CSSProperties
}


export const Img: FC<IComp> = ({ 
  src, alt, width, Sx_parent, Sx_img, cls_img, Sx_defaultImg
}) => {

  const [isLoaded, setIsLoaded] = useState(false);

  const imgRef = useRef<HTMLImageElement|null>(null);

  useEffect(() => {

    if(imgRef && imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }

  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%', 
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      ...(Sx_parent && Sx_parent)
    }}
    >


      {/* =================== default image =================== */}
      <img
        src="/images/default_img.png"
        alt={alt}
        style={{
          maxWidth: '100%',
          height: 'auto',
          ...(Sx_defaultImg && Sx_defaultImg),
          ...(isLoaded ? { display: 'none' }: { display: 'inline-block' })
        }} 
        width={width || '100%'}
      />


      <img
        onLoad={()=> setIsLoaded(true)}
        ref={imgRef}
        src={src}
        alt={alt}
        className={cls_img||''}
        style={{
          maxWidth: '100%',
          height: 'auto',
          ...(Sx_img && Sx_img),
          ...(isLoaded ? { display: 'inline-block' }: { display: 'none' })
        }}
        width={width || '100%'}
      />

    </div>
  )

};