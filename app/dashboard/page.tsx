"use client";
// module
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/hooks/useAuth";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryProvider } from '@/lib/react_query/queryClient';
// data
import { TL_menu_tab, DASHBOARD_TAB_KEY } from './page_data';
// comp
import { Dashboard_navigation_item } from '@/dashboard/navigation';
import { Spinner_Page } from "@/components/shared/spinner/page";
import { Section } from '@/components/shared/section';
import { Page_Header } from '@/components/shared/page_header';
import { Dashboard_Sidebar } from '@/components/dashboard/sidebar';
import { Dashboard_Orders } from '@/components/dashboard/orders';
import { Dashboard_Order_Detail } from '@/components/dashboard/order_detail';
import { Backdrop } from '@/components/shared/backdrop';
import { IconButton } from '@/components/shared/button/icon_button';
import { Sign_Out } from '@/components/dashboard/sign_out';
import { Dashboard_Profile } from '@/components/dashboard/profile';
// style
import classes from '@/styles/dashboard/page.module.css';
// types
import { ty_page_header_nav_item } from '@/types/general.type';
import { Icon_Navbar } from '@/components/icons/navbar';


const nav_list: ty_page_header_nav_item[] = [
  {
    label: 'Dashbord',
    link: null
  }
]


export default function DashBoardPage() {

  const [currentTab, setCurrentTab] = useState<TL_menu_tab>('profile');
  const [menu_isOpen, setMenu_isOpen] = useState(false);

  const { authData, status, clearAuth } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();

  // ==================== navigate to auth, if not signed in
  useEffect(() => {

    if (status === 'success' && !authData) {
      router.push(Dashboard_navigation_item.auth);
    }

  }, [status, authData]);

  // ==================== handle parameter ====================
  useEffect(() => {

    const tab = searchParams.get(DASHBOARD_TAB_KEY) as TL_menu_tab;

    switch (tab) {

      case 'order': {
        setCurrentTab('order');
        break;
      }
      case 'sign_out': {
        setCurrentTab('sign_out');
        break;
      }
      case 'order_detail': {
        setCurrentTab('order_detail');
        break;
      }
      default: {
        setCurrentTab('profile');
      }

    }

  }, [searchParams]);


  if (status === 'loading') {
    return <Spinner_Page />
  }

  if (!authData) return null;

  return (
    <ReactQueryProvider>


      {/* ========================= page header ========================= */}
      <Page_Header title="User Dashboard"
        nav_list={nav_list}
        section_cls={classes.header_section_cls}
      >

        <div className={classes.icon_container}>
          <IconButton onClick={()=> setMenu_isOpen(true)} >
            <Icon_Navbar fill="var(--color_white)" scale={0.9} />
          </IconButton>
        </div>

      </Page_Header>

      <Section>

        <div className={classes.root} >

          {/* =================== sidebar =================== */}

          <div className={classes.sidebar_container}>
            <Dashboard_Sidebar 
              currentTab={currentTab} setMenu_isOpen={setMenu_isOpen} 
            />
          </div>

          {
            menu_isOpen &&
            (
              <Backdrop
                close={() => setMenu_isOpen(false)}
                blur={true}
              >
                <div className={classes.sidebar_container_mobile}>
                  <Dashboard_Sidebar 
                    currentTab={currentTab} setMenu_isOpen={setMenu_isOpen}
                  />
                </div>
              </Backdrop>
            )
          }

          {/* =================== dashboard content =================== */}

          <div className={classes.content}>
            {
              currentTab === 'order' ? <Dashboard_Orders userId={authData.userId} /> :
              currentTab === 'order_detail' ? <Dashboard_Order_Detail /> :
              currentTab === 'sign_out' ? <Sign_Out clearAuth={clearAuth} /> :
              <Dashboard_Profile userId={authData.userId} />
            }
          </div>

        </div>

      </Section>

      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>

  )

}