import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import type { NextPageWithLayout } from '../_app';
import axios, { AxiosError } from 'axios';
import AppLayout from '../../components/Layout/AppLayout';
import { getRadioServerUrl } from '../../util/getUrl';
import { playableStations, TStation } from '../../util/playableStation';
import StationHeaderCard from '../../components/Station/StationHeaderCard';

import { useStationState } from '../../Context/AudioContext';
import { useRouter } from 'next/router';

import StationSection from '../../components/Station/StationSection';

const App: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ topVotedStationsWorldWide, topClickedStationsWorldWide, url }) => {
  const { state } = useStationState();
  const { query } = useRouter();
  const { country } = query;
  const [localStations, setLocalStations] = useState<TStation[] | null>(null);
  useEffect(() => {
    if (!country || !url) {
      return;
    }
    console.log(url);
    const getLocalStations = async () => {
      const result = await axios.get(
        `${url}/stations/search?limit=15&order=votes&reverse=true&is_https=true&hidebroken=true&countrycode=${country}`
      );
      const data: TStation[] = result.data;
      setLocalStations(data);
    };

    getLocalStations();
  }, [country, url]);

  // const country = Router.query['country']

  const isplaying = (station: TStation) => {
    if (state === null || state.isPlaying === undefined) return null;
    if (state.stationuuid !== station.stationuuid) {
      return null;
    }
    return state.isPlaying;
  };

  return (
    <div className='text-CustomTextGrey  sm:overflow-hidden grid sm:grid-cols-[1fr_.4fr] sm:grid-flow-row sm:gap-6 pt-5'>
      <section className='overflow-x-auto'>
        <div className=''>
          <h1 className='font-semibold text-lg break-words'>
            Top Voted Stations Worldwide
          </h1>
        </div>
        <div className=' flex overflow-x-scroll scroll-smooth snap-x snap-mandatory [&>*+*]:ml-[.85rem] scrollbar sm:px-0 '>
          {topVotedStationsWorldWide.map((station) => {
            return (
              <StationHeaderCard
                station={station}
                key={station.stationuuid}
                isPlaying={isplaying(station)}
              />
            );
          })}
        </div>
      </section>
      <section className='hidden sm:block sm:bg-CustomBackgroundBlack sm:mt-7'>
        Recently played
      </section>
      {localStations !== null ? (
        <StationSection
          stations={localStations}
          title='Top Stations in your Area'
        />
      ) : null}
      <StationSection
        stations={topVotedStationsWorldWide}
        title='Stations by Votes'
      />
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
    const topVotedStation = await axios.get(
      `${url}/stations/search?limit=15&order=votes&reverse=true&is_https=true&hidebroken=true`
    );
    const topClickedStations = await axios.get(
      `${url}/stations/search?limit=15&order=clickcount&reverse=true&is_https=true`
    );

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
      revalidate: 60,
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
