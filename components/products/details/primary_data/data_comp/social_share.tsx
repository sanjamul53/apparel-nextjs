import { useState, FC } from 'react';
import { Icon_Facebook } from '@/components/icons/social_facebook';
// types
import { ty_comp_icon } from '@/types/component';
import { Icon_Instagram } from '@/components/icons/social_instagram';
import { Typo } from '@/components/shared/typography';
import { Icon_Twitter } from '@/components/icons/social_twitter';


type T_name = 'Facebook'| 'Twitter' | 'Instagram';

type T_social_item = {
  name: T_name;
  icon_comp: FC<ty_comp_icon>;
  bg_color: string;
  txt_color: string;
}

const default_list: {[key : string]: T_social_item} = {
  'Facebook': {
    name: 'Facebook',
    txt_color: '#3b5998',
    bg_color: 'rgba(59,89,152,.08)',
    icon_comp: Icon_Facebook
  },
  'Instagram': {
    name: 'Instagram',
    txt_color: '#5851db',
    bg_color: 'rgba(88,81,219,.08)',
    icon_comp: Icon_Instagram
  },
  'Twitter': {
    name: 'Twitter',
    txt_color: '#1da1f2',
    bg_color: 'rgba(29,161,242,.08)',
    icon_comp: Icon_Twitter
  }
};

export const Social_Share = () => {

  const [social_list, setSocial_list] = useState(default_list);


  const enter_handler = (name: string) => {
    
    const target_item = default_list[name];

    let modified_item = {
      ...target_item,
      txt_color: '#fff', bg_color: target_item.txt_color
    };

    const modified_list = {
      ...default_list,
      [name]: {...modified_item}
    };

    setSocial_list({...modified_list});

  };

  const leave_hanlder = () => {
    setSocial_list({...default_list});
  }

  return (
    <div
      style={{
        marginTop: '6rem',
        display: 'flex', alignItems: 'center', flexWrap: 'wrap',
        rowGap: '0.5rem'
      }}
    >

      <Typo
        txt="Share:"
        size="1.5rem"
        weight={500}
        margin="0 0.5rem 0 0"
      />

      {
        Object.values(social_list).map(el => {

          return (
            <div key={el.name}
              onMouseEnter={()=> enter_handler(el.name)}
              onMouseLeave={leave_hanlder}
              style={{
                color: el.txt_color, backgroundColor: el.bg_color,
                flex: '0 0 10rem', marginLeft: '1.4rem', cursor: 'pointer',
                borderRadius: '0.4rem', padding: '0.2rem 0.8rem',
                display: 'flex', alignItems: 'center'
              }}
            >

              <el.icon_comp
                fill={`${el.txt_color}`}
                Sx={{ transform: 'translateY(0.2rem) scale(0.6)' }}
              />

              <span style={{
                  marginLeft: '0.2rem', fontSize: '1.4rem', fontWeight: 500
                }} 
              >
                {el.name}
              </span>

            </div>
          )
        })
      }

    </div>
  )

};