import Link from 'next/link';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import axios, { AxiosError } from 'axios';
import { HiExternalLink, HiPlay } from 'react-icons/hi';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdTranslate,
} from 'react-icons/md';
import AppLayout from '../../components/Layout/AppLayout';
import { getRadioServerUrl } from '../../util/getUrl';
import { playableStations, TStation } from '../../util/playableStation';
import StationCard from '../../components/Station/StationCard';

const App: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ topVotedStationsWorldWide }) => {
  // console.log(topVotedStationsWorldWide[0].favicon);
  // console.log(topVotedStationsWorldWide);
  return (
    <div className='text-CustomTextGrey overflow-hidden'>
      <section className='mt-5'>
        <div className='flex justify-between items-center'>
          <h1 className='font-semibold text-lg break-words'>
            Top Voted Stations
          </h1>
          <span className='grid grid-flow-col items-center gap-[0.375rem] ml-4'>
            <button className='hover:text-CustomActivePurple'>
              <span className='sr-only'>Previous Station</span>
              <MdOutlineArrowBackIos className='text-2xl' />
            </button>
            <p className=''>
              <span className='text-CustomActivePurple font-bold'>1</span>
              <span className='align-[20%]'> ... </span>
              <span>5</span>
            </p>
            <button className='hover:text-CustomActivePurple'>
              <span className='sr-only'>Next Station</span>
              <MdOutlineArrowForwardIos className='text-2xl' />
            </button>
          </span>
        </div>
        <div className='min-w-[300px] flex overflow-x-auto scroll-smooth snap-x snap-mandatory lg:snap-none  px-3 [&>*+*]:ml-3 scrollbar'>
          {topVotedStationsWorldWide.map((station) => {
            return (
              <StationCard
                station={station}
                key={station.stationuuid}
                className='w-11/12 snap-center flex-shrink-0 max-w-[320px]'
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  topVotedStationsWorldWide: TStation[];
}> = async () => {
  try {
    const url = await getRadioServerUrl();
    const topVotedStation = await axios.get(`${url}/json/stations/topvote/10`);
    const topVotedStationsWorldWide = playableStations(topVotedStation.data);
    return {
      props: {
        topVotedStationsWorldWide,
      },
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
