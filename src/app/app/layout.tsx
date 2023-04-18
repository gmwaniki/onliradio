import Image from 'next/image';
import React, { Suspense } from 'react';
import {
  HiOutlineClock,
  HiOutlineGlobe,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineSearch,
} from 'react-icons/hi';

import logo from '../../assets/logo.svg';
import IndexLink from '../../components/NavLink/IndexLink';
import NavLink from '../../components/NavLink/NavLink';
import Player from '../../components/Player/Player';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-CustomBlack min-h-screen pb-40 sm:pb-0 sm:grid sm:grid-cols-[minmax(0,clamp(200px,14%,250px)),minmax(0,1fr)] '>
      <div className='relative flex flex-col justify-between'>
        <main className='p-[10px] '>{children}</main>
        <Player />
      </div>

      <nav
        className=' fixed bottom-0 w-full bg-CustomLightBlack  text-CustomWhite border border-transparent border-t-2 border-t-CustomLightBlack sm:left-0 sm:top-0 sm:bottom-auto  sm:sticky
        sm:max-h-screen sm:col-start-1 sm:row-start-1 sm:pt-[10px] overflow-y-auto'
      >
        <ul className='flex sm:flex-col sm:gap-4 sm:rounded-tr sm:relative sm:z-20 sm:text-xl'>
          <li className='hidden sm:block mx-3 relative isolate -z-10'>
            <div className='  bg-CustomBlack py-7 px-1  rounded-l relative -z-10 rounded'>
              <Image src={logo} alt='onliradio logo' />
            </div>
          </li>
          <li className='flex-1'>
            <NavLink path={'/app'} className=''>
              <HiOutlineHome className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />

              <span className=' sm:group-data-[active=true]:bg-transparent sm:group-data-[active=true]:text-CustomWhite sm:px-0 sm:mx-0'>
                Home
              </span>
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink path='/app/search' className=''>
              <div className='sm:group-data-[active=true]:bg-CustomActive sm:text-CustomWhite '>
                <HiOutlineSearch className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />
              </div>
              <span>Search</span>
            </NavLink>
          </li>
          <li className='flex-1 hidden sm:block'>
            <NavLink path='/app/countries' className=''>
              <div className='sm:group-data-[active=true]:bg-CustomActive sm:text-CustomWhite '>
                <HiOutlineGlobe className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />
              </div>

              <span className=''>Countries</span>
            </NavLink>
          </li>

          <li className='flex-1'>
            <NavLink path='/app/history'>
              <div className='sm:group-data-[active=true]:bg-CustomActive sm:text-CustomWhite '>
                <HiOutlineClock className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />
              </div>

              <span>History</span>
            </NavLink>
          </li>
          <li className='flex-1'>
            <NavLink path='/app/favourites'>
              <div className='sm:group-data-[active=true]:bg-CustomActive sm:text-CustomWhite '>
                <HiOutlineHeart className='text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />
              </div>
              <span>Favourites</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
