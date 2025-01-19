import { CSSProperties, FC, ReactNode } from 'react';

interface IComp {
  children: ReactNode;
  section_cls?: string;
  content_cls?: string;
  without_horizontal_Padding?: boolean;
  section_sx?: CSSProperties;
  content_sx?: CSSProperties;
}

export const Section: FC<IComp> = ({ 
  children, section_cls, content_cls, without_horizontal_Padding,
  section_sx, content_sx
}) => {

  let section_clsList = ['section_general'];
  let content_clsList = ['content_general'];

  if(without_horizontal_Padding !== true) {
    section_clsList = [...section_clsList, 'section_horizontal_padding'];
  }

  // add parent classList
  if(section_cls) {
    section_clsList = [...section_clsList, section_cls];
  }

  // add content classList
  if(content_cls) {
    content_clsList = [...content_clsList, content_cls];
  }


  return (
    <section className={section_clsList.join(' ')}
      style={{...(section_sx ? section_sx: {})}}
    >

      <div className={content_clsList.join(' ')}
        style={{...(content_sx ? content_sx: {})}}
      >

        {children}

      </div>

    </section>
  )

};