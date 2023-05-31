import Link from 'next/link';
import React from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';

import { TCountry } from '../../app/app/countries/page';
import { getCountryName } from '../../util/getCountries';
import getFlagEmoji from '../../util/getFlagEmoji';

type TCountryProps = {
  country: TCountry;
};

const Country = (prop: TCountryProps) => {
  const { country } = prop;
  return (
    <Link
      href={`/app/search?country=${getCountryName.of(country.iso_3166_1)}`}
      className='group grid grid-cols-[1fr,auto] items-center pr-4 pl-2 py-2 mb-4 rounded bg-CustomLightBlack/50  relative isolate sm:mb-0 h-full'
    >
      <div className=' flex flex-col flex-grow'>
        <p className='grid grid-cols-[auto,1fr] items-center gap-x-1 '>
          <span className='basis-auto'> {country.name}</span>
          <span className='justify-self-end'>
            {getFlagEmoji(country.iso_3166_1) || ''}
          </span>
        </p>
      </div>
      <HiOutlineChevronRight className='text-7xl childPath:stroke-1' />
      <span className='absolute -z-10 top-1/3 -translate-y-1/2 right-5 blur-lg text-7xl transition-transform duration-500 group-hover:scale-150 group-hover:transition-transform group-hover:duration-200'>
        {getFlagEmoji(country.iso_3166_1) || ''}
      </span>
    </Link>
  );
};

export default Country;
