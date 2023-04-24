'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

export default function Search({}: { children?: React.ReactNode }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push(`/app/search?name=${searchValue}`);
  };
  return (
    <div className='bg-CustomLightBlack rounded sticky top-1 z-10 sm:bg-CustomLightBlack/80 sm:backdrop-blur-sm sm:top-[10px]'>
      <form className='flex px-3 pb-3 pt-2' onSubmit={onSubmit}>
        <div className='grid grid-cols-[auto,min-content] auto-rows-auto flex-1'>
          <label
            htmlFor='name'
            className='text-CustomWhite font-medium col-span-2'
          >
            Station Name
          </label>
          <input
            type='text'
            name='station_name'
            id='name'
            placeholder='Name'
            className='py-3 pl-2 rounded-l text-lg text-white bg-[#6C6C6C] focus:outline-none focus:ring-2 focus:ring-CustomActive  focus:ring-inset '
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            type='submit'
            aria-label='Search'
            className='bg-CustomActive rounded-r w-12 flex justify-center items-center'
          >
            <HiOutlineSearch className='text-3xl text-CustomWhite' />
          </button>
        </div>
      </form>
    </div>
  );
}
