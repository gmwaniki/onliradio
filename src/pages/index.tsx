import type { NextPage } from 'next';
import HomeLayout from '../components/Layout/HomeLayout';
import { MdOutlineRadio, MdLanguage, MdTranslate } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <HomeLayout>
      <section className='grid sm:grid-cols-2 justify-center items-center pb-12'>
        <div className='text-center sm:text-left'>
          <h1 className='text-3xl lg:text-6xl font-bold'>
            Listen to your favourite radio stations on the go
          </h1>
          <p className='mt-4 text-lg'>
            Onliradio gives you access to over 30,000 radio stations from over
            200+ countries.
          </p>
          <Link href='/app'>
            <a className='bg-gradient mx-auto text-CustomWhite max-w-xs grid grid-cols-[auto,1fr] gap-4 items-center px-7 py-5 mt-10 mb-16 rounded-md cursor-pointer hover:opacity-90 hover:-translate-y-[0.10rem]  duration-300 transition-transform sm:max-w-[13.6rem] sm:mx-0 sm:mb-0'>
              <MdOutlineRadio className='text-3xl' />
              <span className='text-lg'>Listen to radio</span>
            </a>
          </Link>
        </div>

        <div className='mt-10 grid grid-rows-3 gap-y-12 px-12 sm:px-0  sm:grid-rows-1 sm:grid-cols-3 sm:col-span-2 sm:gap-6 lg:col-span-1'>
          <div className='relative bg-CustomPurple grid place-items-center rounded-md'>
            <div className='absolute bg-CustomLightPurple p-4 rounded-full top-0 right-1/2 translate-x-1/2 -translate-y-1/2 '>
              <MdOutlineRadio className='text-CustomVeryPurple text-3xl' />
            </div>
            <div className=' py-8  text-left'>
              <p>
                <span className='text-CustomVeryPurple text-xl block'>
                  Stations
                </span>

                <span className='font-bold text-3xl'>+30,000</span>
              </p>
            </div>
          </div>

          <div className='relative bg-CustomPurple grid place-items-center rounded-md'>
            <div className='absolute bg-CustomLightPurple p-4 rounded-full top-0 right-1/2 translate-x-1/2 -translate-y-1/2 '>
              <MdLanguage className='text-CustomVeryPurple text-3xl' />
            </div>
            <div className='py-10 text-left'>
              <p className='text-CustomVeryPurple text-xl'>Countries</p>
              <p className='font-bold text-3xl'>+200</p>
            </div>
          </div>

          <div className='relative bg-CustomPurple grid place-items-center rounded-md'>
            <div className='absolute bg-CustomLightPurple p-4 rounded-full top-0 right-1/2 translate-x-1/2 -translate-y-1/2 '>
              <MdTranslate className='text-CustomVeryPurple text-3xl' />
            </div>
            <div className=' py-8 text-left'>
              <p className='text-CustomVeryPurple text-xl'>Languages</p>
              <p className='font-bold text-3xl'>+300</p>
            </div>
          </div>
        </div>

        <div className='relative row-start-1 sm:row-start-1 sm:col-start-2 lg:row-end-3'>
          <picture>
            <source srcSet='/images/heroop.avif' type='image/avif' />
            <source srcSet='/images/heroop.webp' type='image/webp' />
            <img
              src='/images/heroop.png'
              alt='Astronaut sitting on a radio'
              width='618px'
              height='617px'
            />
          </picture>
        </div>
      </section>
    </HomeLayout>
  );
};

export default Home;
