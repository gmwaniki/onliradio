import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactElement, useCallback, useRef } from 'react';
import type { NextPageWithLayout } from '../_app';
import axios, { AxiosError } from 'axios';
import AppLayout from '../../components/Layout/AppLayout';
import { getRadioServerUrl } from '../../util/getUrl';
import { playableStations, TStation } from '../../util/playableStation';
import StationHeaderCard from '../../components/Station/StationHeaderCard';
import useInterSectionObserver from '../../hooks/useIntersectionObserver';
import { useStationState } from '../../Context/AudioContext';
import { useRouter } from 'next/router';
import StationCard from '../../components/Station/StationCard';

const App: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ topVotedStationsWorldWide }) => {
  const ref = useRef<HTMLImageElement[]>([]);
  useInterSectionObserver(ref);
  const { state } = useStationState();

  const setImageElementRef = useCallback((el: HTMLImageElement) => {
    if (ref.current) {
      if (!el) return;
      ref.current.push(el);
    }
  }, []);
  const { query } = useRouter();

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
                className=''
                refCallback={setImageElementRef}
                isPlaying={isplaying(station)}
              />
            );
          })}
        </div>
      </section>
      <section className='hidden sm:block sm:bg-CustomBackgroundBlack sm:mt-7'>
        Recently played
      </section>
      <div className='row-start-2  col-span-full'>{query?.country}</div>

      <section className='col-start-1 col-span-full overflow-x-auto'>
        <div className=''>
          <h1 className='font-semibold text-lg break-words'>
            Stations by Votes
          </h1>
        </div>
        <div className=' flex overflow-x-scroll scroll-smooth snap-x snap-mandatory [&>*+*]:ml-[.85rem] scrollbar sm:px-2 pt-2 md:snap-none '>
          {topVotedStationsWorldWide.map((station) => {
            return (
              <StationCard
                station={station}
                key={station.stationuuid}
                refCallback={setImageElementRef}
                isPlaying={isplaying(station)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  topVotedStationsWorldWide: TStation[];
}> = async () => {
  try {
    const url = await getRadioServerUrl();
    const topVotedStation = await axios.get(
      `${url}/json/stations/topvote/10?hidebroken=true`
    );
    // const topVotedStation = await axios.get(
    //   `${url}/json/stations/bycountrycodeexact/ke?hidebroken=true&order=votes&reverse=true`
    // );

    const topVotedStationsWorldWide = playableStations(topVotedStation.data);

    return {
      props: {
        topVotedStationsWorldWide,
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
