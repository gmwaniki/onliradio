import Link from 'next/link';
import Image from 'next/image';
import { MdLanguage, MdOutlineRadio, MdTranslate } from 'react-icons/md';
import hero from '../assets/hero.webp';
import Header from '../components/Header/Header';

export default function Page() {
  return (
    <div className='min-h-screen bg-[#F2F2F2] relative'>
      <div className='container mx-auto pt-5 px-6 sm:px-0 md:px-6 md:pt-7 grid grid-flow-row sm:gap-10 '>
        <Header />

        <main className='sm:px-6 justify-self-end'>
          <section className='grid sm:grid-cols-2 justify-center items-center pb-12'>
            <div className='  grid grid-rows-[repeat(2,min-content),auto] gap-y-4 self-stretch sm:text-left mb-4 sm:mb-0'>
              <h1 className='text-3xl text-center font-bold sm:text-left lg:text-5xl '>
                Listen to your favourite radio stations on the go
              </h1>
              <p className='text-lg text-center sm:text-left'>
                Onliradio gives you access to over 30,000 radio stations from
                over 200+ countries.
              </p>

              <Link
                href='/app'
                className='bg-gradient text-CustomWhite p-4 rounded flex items-center gap-x-2 self-center justify-self-center sm:self-end sm:justify-self-start '
              >
                <MdOutlineRadio className='text-2xl' />
                <span className=''>Listen to radio</span>
              </Link>
            </div>

            <div className='mt-10 grid grid-rows-3 gap-y-12 px-12 sm:px-0  sm:grid-rows-1 sm:grid-cols-3 sm:col-span-2 sm:gap-6 lg:col-span-1'>
              <div className='relative bg-CustomWhite grid place-items-center rounded-md'>
                <div className='absolute  bg-CustomBlack  p-4 rounded-full top-0 right-1/2 translate-x-1/2 -translate-y-1/2 '>
                  <MdOutlineRadio className='text-CustomWhite text-3xl' />
                </div>
                <div className=' py-8  text-left'>
                  <p className='text-CustomBlack text-xl'>Stations</p>
                  <span className='font-semibold text-3xl'>+30,000</span>
                </div>
              </div>

              <div className='relative bg-CustomWhite grid place-items-center rounded-md'>
                <div className='absolute bg-CustomBlack  p-4 rounded-full top-0 right-1/2 translate-x-1/2 -translate-y-1/2 '>
                  <MdLanguage className='text-CustomWhite text-3xl' />
                </div>
                <div className='py-10 text-left'>
                  <p className='text-CustomBlack  text-xl'>Countries</p>
                  <p className='font-semibold text-3xl'>+200</p>
                </div>
              </div>

              <div className='relative bg-CustomWhite  grid place-items-center rounded-md'>
                <div className='absolute bg-CustomBlack  p-4 rounded-full top-0 right-1/2 translate-x-1/2 -translate-y-1/2 '>
                  <MdTranslate className='text-CustomWhite text-3xl' />
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
