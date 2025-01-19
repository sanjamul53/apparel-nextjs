import { FC, Dispatch, SetStateAction } from 'react';
import { ty_comp_icon } from '@/types/component';
import { DASHBOARD_TAB_KEY, TL_menu_tab } from '@/app/dashboard/page_data';
import { Typo } from '../shared/typography';
// style
import classes from '@/styles/dashboard/sidebar.module.css';
// icons
import { Icon_Dashboard } from '../icons/dashboard';
import { Icon_Box } from '../icons/box';
import { Icon_Settings } from '../icons/settings';
import { Icon_Report_01 } from '../icons/report_01';
import { Icon_Cart_Star } from '../icons/cart_star';
import { Icon_Lock } from '../icons/lock';
import { useSetURL } from '@/hooks/useSetURL';
import { cls_join } from '@/functions/cls_join.func';

type T_menu = { 
  icon: FC<ty_comp_icon>; 
  label: string; 
  tab: TL_menu_tab; 
}

interface IComp {
  currentTab: TL_menu_tab;
  setMenu_isOpen: Dispatch<SetStateAction<boolean>>
}

const menuList: T_menu[] = [
  {
    label: 'Profile',
    icon: Icon_Dashboard,
    tab: 'profile'
  },
  {
    label: 'Orders',
    icon: Icon_Box,
    tab: 'order'
  },
  {
    label: 'Reviews',
    icon: Icon_Report_01,
    tab: 'review'
  },
  {
    label: 'Wishlist',
    icon: Icon_Cart_Star,
    tab: 'wishlist'
  },
  {
    label: 'Settings',
    icon: Icon_Settings,
    tab: 'settings'
  },
  {
    label: 'Sign out',
    icon: Icon_Lock,
    tab: 'sign_out'
  }
];

const Accepted_Tabs: TL_menu_tab[] = [
  'order', 'profile', 'sign_out'
]

export const Dashboard_Sidebar: FC<IComp> = ({ currentTab, setMenu_isOpen }) => {

  const { set_param } = useSetURL();

  const clickHandler = (tab: TL_menu_tab) => {

    if(!Accepted_Tabs.includes(tab)) return null;

    setMenu_isOpen(false);

    set_param({
      name: DASHBOARD_TAB_KEY, value: tab,
      remove_rest: true
    });


  }

  return (
    <div className={classes.root}>
      
      {
        menuList.map(el => {

          let item_classList = [classes.menu_item];

          if(!Accepted_Tabs.includes(el.tab)) {
            item_classList.push(classes.disable_item);
          }

          let color = 'var(--color_slate_blue)';
          if(currentTab === el.tab) {
            color = 'var(--color_primary)';
          }

          return (
            <div key={el.tab} className={cls_join(item_classList)}
              onClick={()=> clickHandler(el.tab)}
            >
                
                <div className={classes.menu_item_icon}>
                  <el.icon scale={0.8} fill={color} />
                </div>

                <Typo txt={el.label} weight={500}
                  color={color} clsName={classes.menu_item_label}
                />

            </div>
          )

        })
      }

    </div>
  )

};