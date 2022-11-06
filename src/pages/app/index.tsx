import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { ReactElement, Suspense, useContext, useState } from 'react';
import type { NextPageWithLayout } from '../_app';
import axios, { AxiosError } from 'axios';
import AppLayout from '../../components/Layout/AppLayout';
import { getRadioServerUrl } from '../../util/getUrl';
import { playableStations, TStation } from '../../util/playableStation';
import StationHeaderCard from '../../components/Station/StationHeaderCard';

import { StationContext } from '../../Context/AudioContext';
import { useRouter } from 'next/router';

import StationSection from '../../components/Station/StationSection';
import LocalStation from '../../components/Station/LocalStations';
import Spinner from '../../components/Spinner/Spinner';
import { Sign } from 'crypto';
import { useRef } from 'react';
import { useEffect } from 'react';
// import StationsPlayed from '../../components/Station/StationsPlayed';

const DynamicStationsPlayed = dynamic(
  () => import('../../components/Station/StationsPlayed'),
  { ssr: false }
);

const App: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ topVotedStationsWorldWide, topClickedStationsWorldWide, url }) => {
  const { state, changeUrl } = useContext(StationContext);
  const { isPlaying, station: currentStation } = state;
  const router = useRouter();

  const localCountry = router.query?.country as string | undefined;

  useEffect(() => {
    changeUrl(url);
  }, [changeUrl, url]);
  return (
    <div className='text-CustomTextGrey  sm:overflow-hidden grid sm:grid-cols-[1fr_.4fr] sm:grid-flow-row  sm:gap-6 pt-5'>
      <section className='overflow-x-auto h-min'>
        <h1 className='font-semibold text-lg sm:text-xl '>
          Top Voted Stations Worldwide
        </h1>

        <div className=' flex overflow-x-scroll scroll-smooth snap-x snap-mandatory [&>*+*]:ml-[.85rem] scrollbar sm:px-0 '>
          {topVotedStationsWorldWide.map((station) => {
            return (
              <StationHeaderCard
                station={station}
                key={station.stationuuid}
                isPlaying={
                  station.stationuuid === currentStation?.stationId && isPlaying
                }
              />
            );
          })}
        </div>
      </section>
      <section
        className={`hidden sm:bg-CustomBackgroundBlack sm:mt-7 sm:rounded-md sm:text-center sm:p-2 sm:flex sm:flex-col sm:max-h-[400px] 2xl:max-h-[450px]`}
      >
        <h2 className='text-2xl'>Recently played</h2>
        <div className='h-[100%] overflow-y-scroll scrollbar'>
          <DynamicStationsPlayed url={url} />
        </div>
      </section>
      {localCountry ? (
        <Suspense
          fallback={
            <Spinner
              message='Loading stations in your area '
              className='col-span-full'
            />
          }
        >
          <LocalStation url={url} country={localCountry} />
        </Suspense>
      ) : (
        <Spinner
          message='Loading stations in your area'
          className='col-span-full'
        />
      )}

      <StationSection
        stations={topClickedStationsWorldWide}
        title='Stations by Clicks'
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  url: string;
  topVotedStationsWorldWide: TStation[];
  topClickedStationsWorldWide: TStation[];
}> = async () => {
  try {
    const url = await getRadioServerUrl();

    const [topVotedStation, topClickedStations] = await Promise.all([
      axios.get(
        `${url}/stations/search?limit=10&order=votes&reverse=true&is_https=true&hidebroken=true`
      ),
      axios.get(
        `${url}/stations/search?limit=10&order=clickcount&reverse=true&is_https=true`
      ),
    ]);

    const topVotedStationsWorldWide = playableStations(topVotedStation.data);
    const topClickedStationsWorldWide = playableStations(
      topClickedStations.data
    );

    return {
      props: {
        url,
        topVotedStationsWorldWide,
        topClickedStationsWorldWide,
      },
      // revalidate: 21600,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.code);
      console.log(error.message);
    }
    return {
      notFound: true,
    };
  }
};

App.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default App;
