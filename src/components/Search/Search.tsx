import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { HiHome } from 'react-icons/hi';
import { MdSearch } from 'react-icons/md';
import {
  SearchContext,
  TCheckBoxes,
  TInputValues,
  TSearchReducerEnum,
} from '../../Context/SearchContext';
import SearchTextInput from './SearchTextInput';

const Search = ({}: {}) => {
  const { dispatch, state } = useContext(SearchContext);
  const [inputValues, setInputValues] = useState<TInputValues>({
    country: '',
    genre: '',
    language: '',
    name: '',
  });
  const [inputCheckboxes, setInputCheckboxes] = useState<TCheckBoxes>({
    country: false,
    genre: false,
    language: false,
    name: true,
  });

  const router = useRouter();

  const activeCheckboxes = Object.entries(inputCheckboxes)
    .reverse()
    .filter((item) => {
      return item[1];
    });
  function handleCheckbox(e: React.SyntheticEvent<HTMLInputElement>) {
    const checkboxName: string = e.currentTarget.name;
    setInputCheckboxes({
      ...inputCheckboxes,
      [checkboxName]: !inputCheckboxes[checkboxName],
    });
  }
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isSearchPage = /search/i.test(router.asPath);
    if (!isSearchPage) {
      router.push('/app/search');
    }
    dispatch({
      type: TSearchReducerEnum.SEARCH,
      payload: {
        filter: inputCheckboxes,
        searchValues: inputValues,
      },
    });
  }

  return (
    <div className='sm:sticky sm:top-2 sm:z-10 max-w-[1920px] mx-auto'>
      <form
        className='bg-[#3D3D3D]/60 backdrop-blur  grid grid-flow-row px-3 py-2  rounded gap-4 sm:grid-cols-[auto,minmax(0,1fr),130px] sm:items-end'
        onFocus={() => router.prefetch('/app/search')}
        onSubmit={handleFormSubmit}
      >
        <Link
          href={'/app'}
          className='bg-CustomBlack text-CustomWhite p-4 rounded-md grid grid-flow-col gap-2 items-start w-min justify-start hover:bg-CustomBlack/70 focus:bg-CustomBlack/70 focus:ring-CustomActivePurple focus:ring-4 focus:outline-none'
        >
          <HiHome className='fill-CustomWhite text-2xl' />
          <span>Home</span>
        </Link>
        <div className='grid grid-flow-row gap-y-2 sm:grid-flow-col sm:gap-x-2'>
          {activeCheckboxes.length <= 0 ? (
            <SearchTextInput
              name='name'
              key='name'
              value={inputValues}
              setValue={setInputValues}
            />
          ) : (
            activeCheckboxes.map((checkedCheckbox) => {
              return (
                <SearchTextInput
                  name={checkedCheckbox[0]}
                  key={checkedCheckbox[0]}
                  value={inputValues}
                  setValue={setInputValues}
                />
              );
            })
          )}
        </div>

        <div className='text-CustomWhite grid grid-cols-2  sm:grid-cols-[.2fr,repeat(4,minmax(0,1fr))] gap-2 sm:justify-center items-center sm:col-span-2 sm:col-start-2'>
          <div className='col-span-2 sm:col-auto justify-self-start mr-2'>
            Filters:
          </div>
          <label className='flex items-center'>
            <input
              type='checkbox'
              name='name'
              id=''
              className='appearance-none  w-6 h-6 rounded relative 
              after:w-full after:h-full after:flex after:justify-center after:items-center after:absolute 
              after:rounded after:bg-CustomTextGrey checked:after:content-["✓"] checked:after:bg-CustomActivePurple '
              checked={inputCheckboxes.name}
              onChange={handleCheckbox}
            />
            <div className='ml-2'>Station name</div>
          </label>
          <label className='flex items-center'>
            <input
              type='checkbox'
              name='language'
              id=''
              className='appearance-none  w-6 h-6 rounded relative 
              after:w-full after:h-full after:flex after:justify-center after:items-center after:absolute after:rounded after:bg-CustomTextGrey checked:after:content-["✓"] checked:after:bg-CustomActivePurple '
              checked={inputCheckboxes.language}
              onChange={handleCheckbox}
            />
            <div className='ml-2'>Language</div>
          </label>

          <label className='flex items-center'>
            <input
              type='checkbox'
              name='genre'
              id=''
              className='appearance-none  w-6 h-6 rounded relative 
              after:w-full after:h-full after:flex after:justify-center after:items-center after:absolute after:rounded after:bg-CustomTextGrey checked:after:content-["✓"] checked:after:bg-CustomActivePurple '
              checked={inputCheckboxes.genre}
              onChange={handleCheckbox}
            />
            <div className='ml-2'>Genre</div>
          </label>
          <label className='flex items-center'>
            <input
              type='checkbox'
              name='country'
              id=''
              className='appearance-none  w-6 h-6 rounded relative 
              after:w-full after:h-full after:flex after:justify-center after:items-center after:absolute after:rounded after:bg-CustomTextGrey checked:after:content-["✓"] checked:after:bg-CustomActivePurple '
              checked={inputCheckboxes.country}
              onChange={handleCheckbox}
            />
            <div className='ml-2'>Country</div>
          </label>
        </div>
        <button className='bg-CustomActivePurple text-CustomWhite py-[14px] rounded-md text-xl flex justify-center items-center sm:col-start-3 sm:row-start-1 '>
          <MdSearch className='text-2xl' />
          <span className='ml-1'>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Search;
