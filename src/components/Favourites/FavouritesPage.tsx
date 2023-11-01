'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import useLikes from '../../app/hooks/useLikes';
import astro from '../../assets/favourites.svg';
import { TStation } from '../../util/playableStation';
import Station from '../Station/Station';

type TProps = {
  url: string;
};

export default function FavouritesPage({ url }: TProps) {
  const [_isLiked, likes, _like, _unlike] = useLikes();
  const stationIds = likes
    ? Object.entries(likes)
        .filter((value) => value[1] === '1')
        .map((value) => value[0])
    : [];

  const getStations = async (): Promise<TStation[]> => {
    const result = await fetch(
      `${url}/stations/byuuid?uuids=${stationIds.join(',')}`
    );
    const resultStations = (await result.json()) as TStation[];
    return resultStations;
  };

  const stations = useQuery({
    queryKey: [...stationIds],
    queryFn: getStations,
  });

  // if (stations.isLoading) {
  //   return <span>Loading...</span>;
  // }
  if (!stations.isSuccess) {
    return <span>An Error Occured</span>;
  }

  if (stations.data.length === 0) {
    return (
      <div className='flex flex-col h-full w-full justify-center items-center'>
        <Image
          alt='astronaut holding a star'
          src={astro}
          width={500}
          height={500}
        />
        <h2 className='font-bold text-2xl px-5'>
          Your favourite stations will appear here
        </h2>
      </div>
    );
  }

  return (
    <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)]  items-center justify-center  gap-y-4 gap-x-12 lg:grid-cols-[repeat(3,minmax(250px,1fr))]'>
      {stations.data.map((station) => {
        return (
          <li key={station.stationuuid}>
            <Station station={station} />
          </li>
        );
      })}
    </ul>
  );
}
