'use client';

import { usePathname, useRouter } from 'next/navigation';
import { getStationsUrl, stringCapitalize } from '../../util/getStationsUrl';
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

export default function SearchPage({ url, stations, searchParams }: TProps) {
  const router = useRouter();
  const pathname = usePathname();
  const onFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const searchValues: TProps['searchParams'] = Object.fromEntries(
      formData.entries()
    );
    const stationsUrl = getStationsUrl(
      url,
      Object.fromEntries(formData.entries())
    );
    // console.log(stationsUrl);
    const urlParams = new URLSearchParams();
    if (searchValues.name) {
      urlParams.set('name', stringCapitalize(searchValues.name));
    }
    if (searchValues.country) {
      urlParams.set('country', stringCapitalize(searchValues.country));
    }
    if (searchValues.language) {
      urlParams.set('language', searchValues.language);
    }
    if (searchValues.genre) {
      urlParams.set('tag', searchValues.genre);
    }
    // console.log(urlParams.toString());
    // console.log(`${pathname}?${urlParams.toString()}`);
    router.push(`${pathname}?${urlParams.toString()}`);
  };

  // console.log(stations);

  return (
    <section className='text-CustomWhite min-h-full'>
      <AdvancedSearch submit={onFormSubmit} />
      <ul className='mt-4 grid grid-flow-row grid-cols-[repeat(auto-fit,150px)] items-center justify-center gap-y-5 gap-x-3'>
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
