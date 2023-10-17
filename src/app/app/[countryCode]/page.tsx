import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

import Country from '../../../components/Country/Country';
import HeroCarousel from '../../../components/Station/HeroCarousel';
import Station from '../../../components/Station/Station';
import { getUrl } from '../../../util/getUrl';
import { TStation } from '../../../util/playableStation';
import { TCountry } from '../countries/page';

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
const getCountries = async (url: string) => {
  const results = await fetch(
    `${url}/countries?order=stationcount&reverse=true&limit=5`
  );
  return results.json() as Promise<TCountry[]>;
};

export default async function Page({
  params,
}: {
  params?: { countryCode: string };
}) {
  const url = await getUrl();
  const stations = await getMostVotedStations(url);
  const countryCode = params?.countryCode || 'UG';
  const localStations = await getLocalStations(url, countryCode);
  const mostPlayedStations = await getMostPlayedStations(url);
  const countries = await getCountries(url);

  return (
    <>
      <HeroCarousel stations={stations} />
      <div className='grid grid-flow-row auto-rows-min  gap-y-5'>
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
          <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)]  gap-4 justify-center  lg:pl-3 lg:grid-cols-[repeat(auto-fill,minmax(275px,1fr))] lg:justify-between '>
            {localStations.map((station) => {
              return (
                <li key={station.stationuuid} className='h-full'>
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
          <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)]  gap-4 justify-center  lg:pl-3 lg:grid-cols-[repeat(auto-fill,minmax(275px,1fr))] lg:justify-between'>
            {mostPlayedStations.map((station) => {
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
            <p className='text-lg font-medium'>Countries</p>
            <Link href='/app/countries' className='flex items-center gap-x-2'>
              View More
              <HiOutlineArrowRight />
            </Link>
          </div>
          <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[minmax(125px,1fr)]  gap-4 sm:pl-3'>
            {countries.map((country) => {
              return (
                <li key={country.iso_3166_1}>
                  <Country country={country} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
