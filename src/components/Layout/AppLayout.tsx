import Head from 'next/head';
import { ReactElement, Suspense } from 'react';
import StationContextProvider from '../../Context/AudioContext';
import SearchContextProvider from '../../Context/SearchContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Search from '../Search/Search';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dynamic from 'next/dynamic';

const DynamicPlayer = dynamic(() => import('../Player/Player'), {
  suspense: true,
});

const AppLayout = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Head>
          <title>Onliradio</title>
          <meta
            name='description'
            content='Listen to all your favorite radio stations on the go'
          />
          <link rel='icon' href='/images/logo/favicon/icons-96.png' />
        </Head>
        <div className='bg-CustomBlack relative h-screen  overflow-x-hidden'>
          <div className=' mx-auto pt-6 px-3 sm:px-3   '>
            <SearchContextProvider>
              <Search />
              <StationContextProvider>
                <main className='xl:container mx-auto pb-32'>{children}</main>
                <Suspense fallback={<div></div>}>
                  <DynamicPlayer />
                </Suspense>
              </StationContextProvider>
            </SearchContextProvider>
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
};
export default AppLayout;
