'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';

import { TCountry } from '@/app/app/countries/page';
import { getCountries, getCountriesParams } from '@/util/getCountries';
import { wait } from '@/util/wait';

import Country from './Country';
import LoadCountries from './LoadCountries';

type CountriesProps = {
	initCountries: TCountry[];
	url: string;
};

const Countries = ({ initCountries, url }: CountriesProps) => {
	const getCountriesNext = async ({ pageParam = getCountriesParams.offset }) => {
		const countryListNext = await getCountries(url, pageParam);

		return new Promise<TCountry[]>(resolve => {
			wait(1000, () => resolve(countryListNext));
		});
	};

	const { data, fetchNextPage, isFetched, isFetching } = useInfiniteQuery({
		queryKey: ['countries'],
		queryFn: getCountriesNext,
		getNextPageParam: (lastpage, allpages) => {
			if (lastpage.length == 0) {
				return undefined;
			}
			return allpages.length * getCountriesParams.offset;
		},
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		initialData: {
			pages: [[...initCountries]],
			pageParams: [0],
		},
		initialPageParam: 0,
	});

	return (
		<>
			<ul className='mt-4 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 '>
				{data?.pages.map((countries, index) => {
					return (
						<React.Fragment key={index}>
							{countries.map(country => {
								return (
									<li className='' key={country.iso_3166_1}>
										<Country country={country} />
									</li>
								);
							})}
						</React.Fragment>
					);
				})}
			</ul>
			<LoadCountries getNext={fetchNextPage} isFetched={isFetched} isFetching={isFetching} />
		</>
	);
};

export default Countries;
