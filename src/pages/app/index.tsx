import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactElement, useCallback, useRef } from 'react';
import type { NextPageWithLayout } from '../_app';
import axios, { AxiosError } from 'axios';
import AppLayout from '../../components/Layout/AppLayout';
import { getRadioServerUrl } from '../../util/getUrl';
import { playableStations, TStation } from '../../util/playableStation';
import StationCard from '../../components/Station/StationCard';
import useInterSectionObserver from '../../hooks/useIntersectionObserver';
import { useStationState } from '../../Context/AudioContext';

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
  const isplaying = (station: TStation) => {
    if (state === null || state.isPlaying === undefined) return null;
    if (state.stationuuid !== station.stationuuid) {
      return null;
    }
    return state.isPlaying;
  };

  return (
    <div className='text-CustomTextGrey overflow-hidden'>
      <section className='mt-5'>
        <div className=''>
          <h1 className='font-semibold text-lg break-words'>
            Top Voted Station
          </h1>
        </div>
        <div className='min-w-[300px] flex overflow-x-auto scroll-smooth snap-x snap-mandatory lg:snap-none  px-3 [&>*+*]:ml-3 scrollbar'>
          {topVotedStationsWorldWide.map((station) => {
            return (
              <StationCard
                station={station}
                key={station.stationuuid}
                className='w-11/12 snap-center flex-shrink-0 max-w-[320px]'
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
    console.log(topVotedStation);

    const topVotedStationsWorldWide = playableStations(topVotedStation.data);
    console.log(topVotedStationsWorldWide);
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
