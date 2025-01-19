"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/hooks/useAuth";
import { Fetch } from "@/functions/fetch";
import { Spinner_Page } from "@/components/shared/spinner/page";
import { ty_fetch_status } from "@/types/general.type";
import { Dashboard_navigation_item } from "@/dashboard/navigation";

export default function GoogleCallback() {

  const router = useRouter();
  const [status, setStatus] = useState<ty_fetch_status>('loading');
  // const [uid, setUid] = useState<string|null>(null);
  const { setAuth, authData } = useAuth();


  // ================= sign in on the server =================
  useEffect(() => {


    const fetchGoogleAcount = async () => {

      setStatus('loading');

      // parse the url
      const urlSearchParams = new URLSearchParams(window.location.search);
      const urlParams = Object.fromEntries(urlSearchParams.entries());


      if (urlParams.error) {
        setStatus('error');
      }
      else if (urlParams.code) {

        try {

          const authRes: any = await Fetch({
            url: '/auth/signin',
            methodType: 'POST',
            data: {
              code: urlParams.code
            }
          });

          setStatus('success');

          setAuth(authRes.userId);

        } catch(err) {
          setStatus('error');
        }

      }
    };

    fetchGoogleAcount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {

    if(authData) {
      router.push(Dashboard_navigation_item.dashboard);
    }

  }, [authData]);


  return (
    <Spinner_Page />
  )

};