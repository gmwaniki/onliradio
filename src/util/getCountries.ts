import { TCountry } from '../app/app/countries/page';

export enum getCountriesParams {
  offset = 15,
}

export const getCountries = async (
  url: string,
  offset: number = 0,
  limit: number = getCountriesParams.offset
) => {
  const result = await fetch(
    `${url}/countries?order=name&offset=${offset}&limit=${limit}&hidebroken=true`
  );
  return result.json() as Promise<TCountry[]>;
};

export const getCountryName = (countrycode: string) => {
  if (!countrycode) {
    return '';
  }
  return (
    new Intl.DisplayNames(['en'], { type: 'region' }).of(countrycode) || ''
  );
};
