import Image from 'next/image';
import React from 'react';
import {
  HiOutlineClock,
  HiOutlineGlobe,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineSearch,
} from 'react-icons/hi';

import logo from '@/assets/logo.svg';
import NavLink from '@/components/NavLink/NavLink';
import Player from '@/components/Player/Player';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='text-base bg-CustomBlack min-h-screen pb-40 sm:pb-0 sm:grid sm:grid-cols-[minmax(0,clamp(200px,14%,250px)),minmax(0,1fr)] scrollbar'>
      <div className='relative grid grid-rows-[min-content,minmax(0,1fr),min-content]'>
        <main className='px-2 py-2 mb-4 container mx-auto'>{children}</main>
        <Player />
      </div>

      <nav
        className=' fixed bottom-0 w-full bg-CustomLightBlack  text-CustomWhite sm:left-0 sm:top-0 sm:bottom-auto  sm:sticky 
        sm:max-h-screen sm:col-start-1 sm:row-start-1 sm:pt-[10px] overflow-y-auto'
      >
        <ul className='flex sm:flex-col sm:gap-4 sm:rounded-tr sm:relative sm:z-20 sm:text-xl'>
          <li className='hidden sm:block isolate -z-10 w-[calc(100%-0.5rem)] ml-auto'>
            <div className='bg-CustomBlack py-7 px-1  rounded-xl relative -z-10 after:absolute after:-top-12 after:right-0 after:w-5 after:h-12 after:rounded-[0_0_25px_0] after:-z-[1] after:shadow-[0_25px_0_0_#111618] before:absolute before:-top-auto before:right-0 before:w-5 before:h-12 before:rounded-[0_25px_0_0] before:-z-[1] before:-bottom-12 before:shadow-[0_-25px_0_0_#111618]'>
              <Image src={logo} alt='onliradio logo' />
            </div>
          </li>
          <li className='flex-1'>
            <NavLink path={'/app'} className=''>
              <div className=' flex flex-col items-center sm:flex-row sm:gap-5 sm:w-full   '>
                <HiOutlineHome className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />

                <span className=' sm:group-data-[active=true]:bg-transparent  sm:px-0 sm:mx-0'>
                  Home
                </span>
              </div>
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink path='/app/search' className=''>
              <div className=' flex flex-col items-center sm:flex-row sm:gap-5 sm:w-full  '>
                <HiOutlineSearch className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />
                <span>Search</span>
              </div>
            </NavLink>
          </li>
          <li className='flex-1 hidden sm:block'>
            <NavLink path='/app/countries' className=''>
              <div className=' flex flex-col items-center sm:flex-row sm:gap-5 sm:w-full  '>
                <HiOutlineGlobe className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />
                <span className=''>Countries</span>
              </div>
            </NavLink>
          </li>

          <li className='flex-1'>
            <NavLink path='/app/history'>
              <div className='flex flex-col items-center sm:flex-row sm:gap-5 sm:w-full   '>
                <HiOutlineClock className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />
                <span>History</span>
              </div>
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink path='/app/favourites'>
              <div className='flex flex-col items-center sm:flex-row sm:gap-5 sm:w-full   '>
                <HiOutlineHeart className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />
                <span>Favourites</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
