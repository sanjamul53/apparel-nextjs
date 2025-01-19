import { useState, createContext, FC, useContext, ReactNode, Dispatch, SetStateAction, useEffect } 
from 'react';

const AUTH_PREFIX = 'BURGER_SHOP_AUTH_INFO';

interface IAuthData { 
  uid: string | null;
  isLoading: boolean;
};

export interface IContext {
  authData: IAuthData;
  setAuth: (uid: string) => null | undefined;
  clearAuth: () => void;
};

interface IComp {
  children: ReactNode
}

// get auth from local storage
const getAuthStorage = () => {
  const authCache = localStorage.getItem(AUTH_PREFIX);
  if(!authCache) return null;
  return JSON.parse(authCache) as { uid?: string }
}

// auth context
export const AuthContext = createContext<IContext>({
  authData: {
    uid: null,
    isLoading: true
  },
  clearAuth: () => {},
  setAuth: (uid: string) => null
});

// auth context provider
export const AuthProvider: FC<IComp> = ({children}) => {

  const [authData, setAuthData] = useState<IAuthData>({
    uid: null,
    isLoading: true
  });

  // check auth for first time
  useEffect(() => {

    const authCache = getAuthStorage();

    if(authCache && authCache.uid) {
      setAuthData({
        uid: authCache.uid,
        isLoading: false
      })
    }
    else {
      setAuthData({
        isLoading: false,
        uid: null
      })
    }


  }, []);


  // ============= set auth data =============
  const setAuth = (uid: string): any => {

    if(!uid) return null;

    setAuthData({
      uid, isLoading: false
    });

    localStorage.setItem(AUTH_PREFIX, JSON.stringify({
      uid
    }));

  }

  // ============= set auth data =============
  const clearAuth = () => {
    setAuthData({
      uid: null, isLoading: false
    });
    localStorage.removeItem(AUTH_PREFIX);
  }

  return (
    <AuthContext.Provider
      value={{
        authData: authData,
        setAuth,
        clearAuth
      }}>
      {children}
    </AuthContext.Provider>
  )

}