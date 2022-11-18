import Image from 'next/image';

import React, { Suspense } from 'react';
import {
  HiOutlineSearch,
  HiOutlineHeart,
  HiOutlineClock,
  HiClock,
  HiHeart,
  HiOutlineGlobe,
  HiGlobe,
} from 'react-icons/hi';
import NavLink from '../../components/NavLink/NavLink';
import Player from '../../components/Player/Player';

import logo from '../../assets/logo.svg';
import IndexLInk from '../../components/NavLink/IndexLInk';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-CustomBlack min-h-screen mb-40 sm:mb-0 sm:grid sm:grid-cols-[minmax(0,200px),minmax(0,1fr)] lg:grid-cols-[minmax(0,250px),minmax(0,1fr)] 2xl:container'>
      <div className='isolate grid grid-rows-[1fr,auto]  '>
        <main className='p-[10px] '>{children}</main>
        <Player />
      </div>

      {/* player */}
      <nav className='fixed bottom-0 bg-CustomLightBlack w-full text-CustomWhite border border-transparent border-t-2 border-t-CustomLightBlack sm:left-0 sm:top-0 sm:bottom-auto  sm:sticky  sm:max-h-screen sm:col-start-1 sm:row-start-1 sm:pt-[10px]'>
        <ul className='flex sm:flex-col sm:gap-4 sm:rounded-tr sm:relative sm:z-20 sm:text-xl'>
          <li className='hidden sm:block mx-3 relative isolate -z-10'>
            <div className='  bg-CustomBlack py-7 px-1  rounded-l relative -z-10 rounded'>
              <Image src={logo} alt='onliradio logo' />
            </div>
          </li>
          <li className='flex-1'>
            <Suspense fallback='Home'>
              <IndexLInk />
            </Suspense>
          </li>
          <li className='flex-1'>
            <NavLink
              path='/app/search'
              className='flex flex-col items-center pb-1 pt-2 rounded data-[active=true]:text-white sm:flex-row sm:mx-3 sm:px-4 sm:data-[active=true]:bg-[#151515] sm:gap-2 sm:items-center'
            >
              <div className='sm:group-data-[active=true]:bg-CustomActive sm:text-CustomWhite sm:rounded sm:p-1'>
                <HiOutlineSearch className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />
              </div>

              <span className='group-data-[active=true]:bg-CustomBlack rounded px-4 mx-auto text-center sm:group-data-[active=true]:bg-transparent sm:group-data-[active=true]:text-CustomActive sm:px-0 sm:mx-0'>
                Search
              </span>
            </NavLink>
          </li>
          <li className='flex-1 hidden sm:block'>
            <NavLink
              path='/app/countries'
              className='flex flex-col items-center pb-1 pt-2 rounded data-[active=true]:text-white sm:flex-row sm:mx-3 sm:px-4 sm:data-[active=true]:bg-[#151515] sm:gap-2 sm:items-center'
            >
              <div className='sm:group-data-[active=true]:bg-CustomActive sm:text-CustomWhite sm:rounded sm:p-1'>
                <HiOutlineGlobe className='text-3xl childPath:stroke-1 group-data-[active=true]:hidden' />
                <HiGlobe className='text-3xl w-8 h-8 group-data-[active=false]:hidden childPath:stroke-1' />
              </div>

              <span className='group-data-[active=true]:bg-CustomBlack rounded px-4 mx-auto text-center sm:group-data-[active=true]:bg-transparent sm:group-data-[active=true]:text-CustomActive sm:px-0 sm:mx-0'>
                Countries
              </span>
            </NavLink>
          </li>

          <li className='flex-1'>
            <NavLink
              path='/app/history'
              className='flex flex-col items-center pb-1 pt-2 rounded data-[active=true]:text-white sm:flex-row sm:mx-3 sm:px-4 sm:data-[active=true]:bg-[#151515] sm:gap-2 sm:items-center'
            >
              <div className='sm:group-data-[active=true]:bg-CustomActive sm:text-CustomWhite sm:rounded sm:p-1'>
                <HiOutlineClock className='text-3xl childPath:stroke-1 group-data-[active=true]:hidden' />
                <HiClock className='text-3xl w-8 h-8 group-data-[active=false]:hidden childPath:stroke-1' />
              </div>

              <span className='group-data-[active=true]:bg-CustomBlack rounded px-4 mx-auto text-center sm:group-data-[active=true]:bg-transparent sm:group-data-[active=true]:text-CustomActive sm:px-0 sm:mx-0'>
                History
              </span>
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink
              path='/app/favourites'
              className='flex flex-col items-center pb-1 pt-2 rounded data-[active=true]:text-white sm:flex-row sm:mx-3 sm:px-4 sm:data-[active=true]:bg-[#151515] sm:gap-2 sm:items-center'
            >
              <div className='sm:group-data-[active=true]:bg-CustomActive sm:text-CustomWhite sm:rounded sm:p-1'>
                <HiOutlineHeart className='text-3xl childPath:stroke-1 group-data-[active=true]:hidden' />
                <HiHeart className='text-3xl w-8 h-8 group-data-[active=false]:hidden' />
              </div>

              <span className='group-data-[active=true]:bg-CustomBlack rounded px-3 mx-auto text-center sm:group-data-[active=true]:bg-transparent sm:group-data-[active=true]:text-CustomActive sm:px-0 sm:mx-0'>
                Favourites
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
