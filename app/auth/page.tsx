"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/hooks/useAuth";
// comp
import { Spinner_Page } from "@/components/shared/spinner/page";
// style
import { Not_Signed } from "@/components/auth/not_signed";
import { Dashboard_navigation_item } from '@/dashboard/navigation';



export default function Auth() {

  const router = useRouter();
  const { status, authData } = useAuth();

  useEffect(() => {

    if(status === 'success' && authData) {
      router.push(Dashboard_navigation_item.dashboard);
    }

  }, [authData, status]);


  if((status === 'success' && !authData) || status === 'error' ) {
    return (
      <Not_Signed />
    )
  }

  return <Spinner_Page /> 

};