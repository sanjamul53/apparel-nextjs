"use client";
import { useEffect } from 'react';
import { Spinner_Page } from "@/components/shared/spinner/page";
import { is_server } from '@/functions/is_server.func';

export default function LoadingPage() {

  useEffect(() => {
    if(!is_server) {
      window.scrollTo(0, 0);
    }
  }, [])

  return (
    <Spinner_Page />
  )

}