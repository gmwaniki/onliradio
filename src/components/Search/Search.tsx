import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { MdArrowBack, MdSearch } from 'react-icons/md';

const Search = ({
  previousPage,
  className,
}: {
  previousPage: string;
  className?: string;
}) => {
  const [selectValue, setSelectValue] = useState('');
  const [searchInput, setSearchInput] = useState<string>('');
  const router = useRouter();
  function handleBackClick(e: React.SyntheticEvent<HTMLButtonElement>) {
    if (!previousPage) {
      return router.replace('/app');
    }
    router.replace(previousPage);
    return;
  }
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.currentTarget.value);
  }

  return (
    <div className='sticky top-2 z-10'>
      <form
        onFocus={() => router.prefetch('/app/seart')}
        onSubmit={(e) => {
          e.preventDefault();
          router.push('/app/search');
        }}
      >
        <div className='grid grid-cols-[1fr_auto] px-3 py-2 bg-CustomBackgroundBlack rounded'>
          <label className='relative border-r-2 border-r-CustomBackgroundBlack'>
            <span className='sr-only'>
              Search for a radio station by entering a {selectValue || 'name'}
            </span>
            <input
              type='text'
              className='h-full w-full rounded-l-md py-4 pr-4 pl-10 peer text-CustomWhite bg-CustomLightGrey  placeholder:text-CustomWhite outline-none focus:ring-1 ring-CustomActivePurple'
              placeholder={`Enter a ${selectValue || 'station name'}`}
              value={searchInput}
              onChange={handleInputChange}
            />

            <MdSearch
              className='absolute top-1/2 -translate-y-1/2 ml-2 text-3xl opacity-0 transition-[opacity] duration-300 peer-placeholder-shown:fill-CustomWhite peer-placeholder-shown:opacity-100'
              aria-hidden='true'
            />

            <button
              className='absolute top-1/2 -translate-y-1/2  left-0 h-full opacity-100 delay-300  peer-placeholder-shown:opacity-0 peer-placeholder-shown:delay-75'
              type='button'
              onClick={handleBackClick}
              disabled={!searchInput}
            >
              <span className='sr-only'>Go back</span>
              <MdArrowBack
                className='ml-2 text-3xl fill-CustomWhite'
                aria-hidden='true'
              />
            </button>
          </label>
          <label className='relative group'>
            <span className='absolute h-full w-full bg-CustomLightGrey text-CustomWhite  pointer-events-none grid grid-cols-[2fr_1fr] justify-center items-center rounded-r-md group-focus-within:ring-1 ring-CustomActivePurple'>
              <span className='justify-self-center capitalize truncate w-[6ch] inline-block '>
                {selectValue}
              </span>
              <HiChevronDown className='fill-CustomWhite text-2xl justify-self-center' />
            </span>
            <select
              name='searchCategory'
              id=''
              className='h-[95%] my-[2%]  bg-CustomWhite outline-none w-[95%] mx-[2%]'
              onChange={(e) => {
                setSelectValue(e.target.value);
              }}
              title={selectValue}
            >
              <option value=''></option>
              <option value='name'>Name</option>
              <option value='country'>Country</option>
              <option value='language'>Language</option>
              <option value='genre'>Genre</option>
            </select>
          </label>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Search);
