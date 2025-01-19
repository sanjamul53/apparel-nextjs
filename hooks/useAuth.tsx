import { useState, useEffect } from 'react';
import { ty_fetch_status } from '@/types/general.type';
import { Fetch } from '@/functions/fetch';

const AUTH_PREFIX = 'APPREAL_AUTH';

const AUTH_ERR_PREFIX = 'APPREAL_ERR_AUTH';

interface T_AuthData {
  userId: string;
};

// ============== get session
const getAuthSession = () => {

  const authCache = sessionStorage.getItem(AUTH_PREFIX);

  if (!authCache) return null;

  const authData = JSON.parse(authCache) as T_AuthData;

  return authData;

}

const getAuthErr = () => {
  const authCache = sessionStorage.getItem(AUTH_ERR_PREFIX);
  if (!authCache) return null;
  return true;
}


// ============== create session
const createAuthSession = (authData: T_AuthData) => {
  sessionStorage.setItem(AUTH_PREFIX, JSON.stringify(authData));
}

const createAuthError = () => {
  sessionStorage.setItem(AUTH_ERR_PREFIX, JSON.stringify(true));
}

export const useAuth = () => {

  const [authData, setAuthData] = useState<T_AuthData | null>(null);
  const [status, setStatus] = useState<ty_fetch_status>('loading');


  useEffect(() => {

    const fetchAuth = async () => {
      try {

        setAuthData(null);
        setStatus('loading');

        const res = await Fetch<T_AuthData>({
          url: '/auth/authorization',
          methodType: 'GET',
          options: {
            cache: 'no-cache'
          }
        });

        setAuthData(res);
        setStatus('success');

        createAuthSession(res);

      }
      catch (err) {
        setAuthData(null);
        setStatus('error');
        
        createAuthError();
      }
    };




    // check auth session storage
    const authCache = getAuthSession();
    if (authCache) {
      setAuthData(authCache);
      setStatus('success');
      return;
    }

    // if auth error session found
    const authErrorCache = getAuthErr();
    if(authErrorCache) {
      setAuthData(null);
      setStatus('success');
      return;
    }

    fetchAuth();


  }, []);


  // ============= set auth data =============
  const setAuth = (user_id: string): any => {

    if (!user_id || !user_id) return null;

    const dt: T_AuthData = {
      userId: user_id
    }

    setAuthData({...dt});
    setStatus('success');
    createAuthSession(dt);

  }

  // ============= clear auth data =============
  const clearAuth = () => {
    setAuthData(null);
    setStatus('success');
    sessionStorage.removeItem(AUTH_PREFIX);
    createAuthError();
  }

  return {
    status, authData, setAuth, clearAuth
  }


}