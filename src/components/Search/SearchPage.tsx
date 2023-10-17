'use client';

import { TStation } from '../../util/playableStation';
import Station from '../Station/Station';

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
  return (
    <section className='text-CustomWhite '>
      <ul className='mt-4 grid grid-flow-row grid-cols-[repeat(auto-fit,150px)] items-center justify-center gap-y-5 gap-x-3 lg:grid-cols-[repeat(3,minmax(275px,1fr))] '>
        {stations.map((station) => {
          return (
            <li key={station.stationuuid}>
              <Station station={station} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
