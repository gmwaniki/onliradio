import Link from 'next/link';
import { HiOutlineChevronRight } from 'react-icons/hi';
import Search from '../../../components/Search/Search';
import getFlagEmoji from '../../../util/getFlagEmoji';
import { getUrl } from '../../../util/getUrl';

type TCountries = {
  name: string;
  iso_3166_1: string;
  stationcount: number;
};

const getCountries = async (url: string) => {
  const result = await fetch(`${url}/countries?order=name`);
  return result.json() as Promise<TCountries[]>;
};

export default async function Page() {
  const url = await getUrl();
  const countries = await getCountries(url);

  return (
    <section className='text-CustomWhite'>
      <Search />
      <ul className='mt-4 sm:grid sm:grid-cols-3 sm:gap-4'>
        {countries.map((country) => {
          return (
            <li key={country.iso_3166_1}>
              <Link
                href={`/app/search/country/${country.iso_3166_1}`}
                className='flex justify-between items-center pr-4 pl-2 py-2 mb-4 rounded bg-CustomLightBlack/50  relative isolate sm:mb-0'
              >
                <div className=' flex flex-col '>
                  <p>
                    {country.name}
                    {getFlagEmoji(country.iso_3166_1) || ''}
                  </p>
                </div>
                <HiOutlineChevronRight className='text-7xl childPath:stroke-1' />
                <span className='absolute -z-10 top-1/2 -translate-y-1/2 right-0 blur-lg text-7xl'>
                  {getFlagEmoji(country.iso_3166_1) || ''}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
