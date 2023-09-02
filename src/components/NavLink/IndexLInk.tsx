import React from 'react';
import { HiOutlineHome } from 'react-icons/hi';
import NavLink from './NavLink';

export default function IndexLInk() {
  return (
    <>
      <NavLink
        path={'/app'}
        className='flex flex-col items-center pb-1 pt-2 rounded data-[active=true]:text-white sm:flex-row sm:mx-3 sm:px-4 sm:data-[active=true]:bg-[#151515] sm:gap-2 sm:items-center'
      >
        <div className='sm:group-data-[active=true]:bg-CustomActive sm:text-CustomWhite sm:rounded sm:p-1'>
          <HiOutlineHome className='text-3xl w-8 h-8 childPath:stroke-1 group-data-[active=true]:childPath:stroke-2' />
        </div>

        <span className='group-data-[active=true]:bg-CustomBlack rounded px-4 mx-auto text-center sm:group-data-[active=true]:bg-transparent sm:group-data-[active=true]:text-CustomActive sm:px-0 sm:mx-0'>
          Home
        </span>
      </NavLink>
    </>
  );
}
