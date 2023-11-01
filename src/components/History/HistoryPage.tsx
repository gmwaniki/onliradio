'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import useHistory from '../../app/hooks/useHistory';
import historyImg from '../../assets/history.svg';
import { TStation } from '../../util/playableStation';
import Station from '../Station/Station';

type TProps = {
  url: string;
};

export default function HistoryStations({ url }: TProps) {
  const getStations = async ({ queryKey }: { queryKey: string[] }) => {
    console.log(queryKey);
    const result = await fetch(
      `${url}/stations/byuuid?uuids=${queryKey.join(',')}`
    );
    const resultStations = (await result.json()) as TStation[];
    return resultStations;
  };
  const { historyStation } = useHistory();

  const stations = useQuery({
    queryKey: Object.keys(historyStation),
    queryFn: getStations,
    staleTime: Infinity,
  });

  if (stations.isLoading || stations.isFetching) {
    return <span>Loading...</span>;
  }

  if (stations.error) {
    return <span>An Error Occured</span>;
  }

  if (stations.data?.length === 0) {
    return (
      <div className='flex flex-col h-full w-full justify-center items-center'>
        <Image
          alt='astronaut holding a star'
          src={historyImg}
          width={500}
          height={500}
        />
        <h2 className='font-bold text-2xl px-5'>
          Stations you have listened to will appear hear
        </h2>
      </div>
    );
  }

  return (
    <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)]  items-center justify-center  gap-y-4 gap-x-12 lg:grid-cols-[repeat(3,minmax(250px,1fr))]'>
      {stations.data?.map((station) => {
        return (
          <li key={station.stationuuid}>
            <Station station={station} />
          </li>
        );
      })}
    </ul>
  );
}
