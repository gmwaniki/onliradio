import Link from 'next/link';

import { HiOutlineArrowRight } from 'react-icons/hi';

import { TStation } from '../../../util/playableStation';
import { getUrl } from '../../../util/getUrl';
import Search from '../../../components/Search/Search';
import HeroStation from '../../../components/Station/HeroStation';
import Station from '../../../components/Station/Station';

const getMostVotedStations = async (url: string) => {
  const stations = await fetch(
    `${url}/stations/search?order=votes&hidebroken=true&is_https=true&limit=10&reverse=true`
  );
  return stations.json() as Promise<TStation[]>;
};

const getLocalStations = async (url: string, countryCode: string) => {
  const results = await fetch(
    `${url}/stations/search?order=votes&countrycode=${countryCode}&hidebroken=true&is_https=true&limit=5&reverse=true`
  );
  return results.json() as Promise<TStation[]>;
};
const getMostPlayedStations = async (url: string) => {
  const results = await fetch(
    `${url}/stations/search?order=clickcount&hidebroken=true&is_https=true&limit=5&reverse=true`
  );
  return results.json() as Promise<TStation[]>;
};

export default async function Page({
  params,
}: {
  params?: { countryCode: string };
}) {
  const url = await getUrl();
  const stations = await getMostVotedStations(url);
  const countryCode = params?.countryCode || 'UG';

  const localStations = await getLocalStations(url, countryCode || 'US');
  const mostPlayedStations = await getMostPlayedStations(url);

  return (
    <>
      <Search />
      <HeroStation stations={stations} />
      <div className='text-CustomWhite'>
        <div className='flex justify-between items-center py-2'>
          <p className='text-lg font-medium'>Top Stations in your Area</p>
          <Link
            href={`/app/search/country/${countryCode}`}
            className='flex items-center gap-x-2'
          >
            View More
            <HiOutlineArrowRight />
          </Link>
        </div>
        <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)]  items-center justify-center  gap-y-4 gap-x-12 lg:justify-start sm:pl-3'>
          {localStations.map((station) => {
            return (
              <li key={station.stationuuid}>
                <Station station={station} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className='text-CustomWhite'>
        <div className='flex justify-between items-center py-2'>
          <p className='text-lg font-medium'>Most Played Stations</p>
          <Link
            href='/app/search/topclick'
            className='flex items-center gap-x-2'
          >
            View More
            <HiOutlineArrowRight />
          </Link>
        </div>
        <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)] items-center justify-center  gap-y-4 gap-x-12 lg:justify-start sm:pl-3'>
          {mostPlayedStations.map((station) => {
            return (
              <li key={station.stationuuid}>
                <Station station={station} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}