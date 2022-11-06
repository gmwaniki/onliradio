import Head from 'next/head';
import SearchContextProvider from '../../Context/SearchContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Search from '../Search/Search';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import PlayerContainer from '../Player/PlayerContainer';
import dynamic from 'next/dynamic';

const StationContextProvider = dynamic(import('../../Context/AudioContext'), {
  ssr: false,
});

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools position='top-right' initialIsOpen={false} />
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
                <PlayerContainer />
              </StationContextProvider>
            </SearchContextProvider>
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
};
export default AppLayout;
