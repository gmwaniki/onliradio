'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { getStationsUrl } from '../../util/getStationsUrl';
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

export default function SearchPage({ stations, url }: TProps) {
  const searchParams = useSearchParams();
  const searchparams = {
    country: searchParams?.get('country') || '',
    genre: searchParams?.get('genre') || '',
    name: searchParams?.get('name') || '',
    language: searchParams?.get('language') || '',
  };
  const getStationsNext = async ({ pageParam }: { pageParam: number }) => {
    if (searchParams?.size === 0) {
      return [];
    }
    const stationsUrl = getStationsUrl(
      url,
      {
        ...searchparams,
      },
      15,
      pageParam
    );

    const results = await fetch(stationsUrl);
    return results.json() as Promise<TStation[]>;
  };

  const { data, fetchNextPage, isFetched, isFetching } = useInfiniteQuery({
    queryKey: [searchParams?.toString()],
    queryFn: getStationsNext,
    getNextPageParam: (lastpage, allpages) => {
      if (stations.length === 0) {
        return 0;
      }
      if (lastpage.length == 0) {
        return undefined;
      }
      return allpages.length * 15;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    initialData: {
      pages: [[...stations]],
      pageParams: [0],
    },
    initialPageParam: 0,
  });

  return (
    <section className='text-CustomWhite '>
      <AdvancedSearch {...searchparams} />

      {data.pages.map((stations, index) => {
        return (
          <React.Fragment key={index}>
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
          </React.Fragment>
        );
      })}
      {data.pages[data.pages.length - 1].length > 0 ? (
        <div className='flex justify-center items-center'>
          <button
            type='button'
            className='bg-CustomLightBlack text-CustomActive p-4 rounded mt-4 mx-auto'
            onClick={() => fetchNextPage()}
          >
            Load more
          </button>
        </div>
      ) : null}
    </section>
  );
}
