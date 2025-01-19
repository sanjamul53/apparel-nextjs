"use client";
import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      // cacheTime: Infinity,
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    },
  },
});

interface IComp {
  children: ReactNode;
}

export const ReactQueryProvider: FC<IComp> = ({ children }) => {

  return (
    <QueryClientProvider client={queryClient} >
      {children}
    </QueryClientProvider>
  )

}


