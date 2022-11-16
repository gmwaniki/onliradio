'use client';

import { useEffect, useState } from 'react';
import { TStation } from '../../util/playableStation';
import Station from '../Station/Station';

type TProps = {
  url: string;
};

export default function FavouritesPage({ url }: TProps) {
  const [stations, setStations] = useState<TStation[]>([]);

  useEffect(() => {
    const likedStations = localStorage.getItem('likes');
    const getStations = async () => {
      if (likedStations === null) {
        return;
      }
      const stationIds: string[] = JSON.parse(likedStations);
      try {
        const result = await fetch(
          `${url}/stations/byuuid?uuids=${stationIds.join(',')}`
        );
        const resultStations = (await result.json()) as TStation[];
        setStations(resultStations);
      } catch (error) {
        setStations([]);
      }
    };
    getStations();
  }, [url]);

  return (
    <section className='text-CustomWhite'>
      <h1 className='text-center font-semibold text-4xl mb-4'>
        Stations you Liked
      </h1>

      <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)]  items-center justify-center  gap-y-4 gap-x-12 '>
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
