'use client';

import { useSearchParams } from 'next/navigation';

import { TStation } from '../../util/playableStation';
import Station from '../Station/Station';
import AdvancedSearch from './AdvancedSearch';

type TProps = {
  url: string;
  stations: TStation[];
  searchParams?: {
    name?: string;
    genre?: string;
    country?: string;
    language?: string;
  };
};

export default function SearchPage({ stations }: TProps) {
  const searchParams = useSearchParams();
  return (
    <section className='text-CustomWhite '>
      <AdvancedSearch />
      {stations.length === 0 && searchParams?.size > 0 ? (
        <p className='text-center text-2xl pt-5 font-semibold'>
          No result found
        </p>
      ) : (
        <ul className='mt-4 grid grid-flow-row grid-cols-[repeat(auto-fit,150px)] items-center justify-center gap-y-5 gap-x-3 lg:grid-cols-[repeat(3,minmax(275px,1fr))] '>
          {stations.map((station) => {
            return (
              <li key={station.stationuuid}>
                <Station station={station} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
