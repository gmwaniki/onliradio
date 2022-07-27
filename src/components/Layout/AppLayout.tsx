import Head from 'next/head';
import { ReactElement, useState } from 'react';
import StationContextProvider from '../../Context/AudioContext';
import Player from '../Player/Player';

import Search from '../Search/Search';

const AppLayout = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [previousPage, setPreviousPage] = useState('');

  return (
    <>
      <Head>
        <title>Onliradio</title>
        <meta
          name='description'
          content='Listen to all your favorite radio stations on the go'
        />
        <link rel='icon' href='/images/logo/favicon/icons-96.png' />
      </Head>
      <div className='bg-CustomBlack relative min-h-screen h-full overflow-x-hidden'>
        <div className=' mx-auto pt-6 px-3 sm:px-3 h-screen relative  '>
          <Search previousPage={previousPage} />
          <StationContextProvider>
            <main className='container mx-auto pb-32'>{children}</main>
            <Player />
          </StationContextProvider>
        </div>
      </div>
    </>
  );
};
export default AppLayout;
