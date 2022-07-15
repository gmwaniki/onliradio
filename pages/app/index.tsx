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

const App: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ topVotedStationsWorldWide }) => {
  // console.log(topVotedStationsWorldWide[0].favicon);
  console.log(topVotedStationsWorldWide);
  return (
    <div className='text-CustomTextGrey'>
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
            <span className='text-CustomActivePurple font-bold'>1</span>
            <button className='hover:text-CustomActivePurple'>
              <span className='sr-only'>Next Station</span>
              <MdOutlineArrowForwardIos className='text-2xl' />
            </button>
          </span>
        </div>
        <section className='bg-CustomBackgroundBlack grid grid-flow-col mt-4 pb-4 rounded-md'>
          <div className='grid grid-cols-3 grid-rows-[auto_1fr_auto] px-2 '>
            <div className='col-start-1 col-end-4 flex justify-between items-center'>
              <Link href={topVotedStationsWorldWide[0].homepage}>
                <a target='_blank'>
                  <span className='sr-only'>Go to radio station website</span>
                  <HiExternalLink
                    className='text-3xl hover:fill-CustomActivePurple'
                    aria-hidden='true'
                  />
                </a>
              </Link>

              <button>
                <span className='sr-only'>Play station</span>
                <HiPlay className='text-6xl mt-1 hover:fill-CustomActivePurple  bg-clip-border' />
              </button>
            </div>
            <div className='col-span-3 flex justify-center items-center'>
              <picture className='relative w-[30%] flex justify-center items-center'>
                <img
                  src='/images/logo/vector/default-monochrome-white.svg'
                  alt='User image'
                  width='300px'
                  height='auto'
                />
              </picture>
            </div>
            <div className='mt-4'>
              <h2
                className='text-ellipsis overflow-hidden whitespace-nowrap block'
                title={topVotedStationsWorldWide[1].name}
              >
                {topVotedStationsWorldWide[0].name}
              </h2>
              <div className='flex items-center'>
                <div className='sr-only'>Language</div>
                <MdTranslate aria-hidden='true' />
                <span className='ml-1'>English</span>
              </div>
            </div>
            <div></div>
          </div>
        </section>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  topVotedStationsWorldWide: any[];
}> = async () => {
  try {
    const url = await getRadioServerUrl();
    // console.log(url);
    // console.log(`${url}/json/stations/topvote/`);
    const topVotedStation = await axios.get(`${url}/json/stations/topvote/10`);
    const topVotedStationsWorldWide = topVotedStation.data;
    return {
      props: {
        topVotedStationsWorldWide: topVotedStationsWorldWide,
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
