import Image from 'next/image';
import Link from 'next/link';
import { MdLanguage, MdOutlineRadio, MdTranslate } from 'react-icons/md';

import hero from '../assets/hero.webp';
import Header from '../components/Header/Header';

export default function Page() {
  return (
    <div className='min-h-screen  relative text-base '>
      <div className='container mx-auto pt-5 px-6 sm:px-0 md:px-6 md:pt-7 grid grid-flow-row sm:gap-10 '>
        <Header />

        <main className='sm:px-6 justify-self-end'>
          <section className='grid sm:grid-cols-2 justify-center items-center pb-12'>
            <div className='  grid grid-rows-[repeat(2,min-content),auto] gap-y-4 self-stretch sm:text-left mb-4 sm:mb-0'>
              <h1 className='text-3xl text-center font-bold sm:text-left lg:text-5xl '>
                Listen to your favourite radio stations on the go
              </h1>
              <p className='text-lg text-center sm:text-left'>
                {/* Onliradio gives you access to over 30,000 radio stations from
                over 200+ countries. */}
                Immerse yourself in the diverse and dynamic world of music,
                news, and entertainment with OnliRadio.We have an impressive
                lineup of over 30,000 radio stations at your fingertips,
                OnliRadio ensures you&apos;ll always find something to suit your
                taste. No matter where you are in the world, our software
                connects you to a vast array of content from 200 countries and
                in over 300 languages.
              </p>

              <Link
                href={`/app`}
                className='bg-gradient text-white p-4 rounded flex items-center gap-x-2 self-center justify-self-center transition-transform duration-300 sm:self-end sm:justify-self-start hover:scale-105 hover:transition-transform hover:duration-300'
              >
                <MdOutlineRadio className='text-2xl' />
                <span className=''>Listen to radio</span>
              </Link>
            </div>

            <div className='mt-10 grid grid-rows-3 gap-y-12 px-12 sm:px-0  sm:grid-rows-1 sm:grid-cols-3 sm:col-span-2 sm:gap-6 lg:col-span-1'>
              <div className='relative bg-CustomWhite grid place-items-center rounded-md'>
                <div className='absolute  bg-CustomBlack  p-4 rounded-full top-0 right-1/2 translate-x-1/2 -translate-y-1/2  '>
                  <MdOutlineRadio className='text-white text-3xl' />
                </div>
                <div className=' py-8 text-left'>
                  <p className='text-CustomBlack text-xl'>Stations</p>
                  <span className='font-semibold text-3xl'>+30,000</span>
                </div>
              </div>

              <div className='relative bg-CustomWhite grid place-items-center rounded-md'>
                <div className='absolute bg-CustomBlack  p-4 rounded-full top-0 right-1/2 translate-x-1/2 -translate-y-1/2 '>
                  <MdLanguage className='text-white text-3xl' />
                </div>
                <div className='py-10 text-left'>
                  <p className='text-CustomBlack  text-xl'>Countries</p>
                  <p className='font-semibold text-3xl'>+200</p>
                </div>
              </div>

              <div className='relative bg-CustomWhite  grid place-items-center rounded-md'>
                <div className='absolute bg-CustomBlack  p-4 rounded-full top-0 right-1/2 translate-x-1/2 -translate-y-1/2 '>
                  <MdTranslate className='text-white text-3xl' />
                </div>
                <div className=' py-8 text-left'>
                  <p className='text-CustomBlack  text-xl'>Languages</p>
                  <p className='font-semibold text-3xl'>+300</p>
                </div>
              </div>
            </div>

            <div className='relative justify-self-end row-start-1 sm:row-start-1 sm:col-start-2 lg:row-end-3'>
              <Image src={hero} alt='Astronaut sitting on a radio' priority />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
