import { TCheckBoxes, TInputValues } from '../Context/SearchContext';

type TgetStation = (
  url: string,
  searchValues: TInputValues,
  filters: TCheckBoxes
) => string;
export const getStationsUrl: TgetStation = (url, searchValues, filters) => {
  const getUrl = new URL(`${url}/stations/search`);
  getUrl.searchParams.set('limit', '15');
  getUrl.searchParams.set('order', 'votes');
  getUrl.searchParams.set('reverse', 'true');
  getUrl.searchParams.set('is_https', 'true');
  getUrl.searchParams.set('hidebroken', 'true');
  if (filters.name && searchValues.name) {
    getUrl.searchParams.set('name', stringCapitalize(searchValues.name));
  }
  if (filters.country && searchValues.country) {
    getUrl.searchParams.set('country', stringCapitalize(searchValues.country));
  }
  if (filters.language && searchValues.language) {
    getUrl.searchParams.set('language', searchValues.language);
  }
  if (filters.genre && searchValues.genre) {
    getUrl.searchParams.set('tag', searchValues.genre);
  }

  return getUrl.href;
};
const stringCapitalize = (value: string): string => {
  return value
    .trim()
    .split(' ')
    .map((item) => item[0].toUpperCase() + item.substring(1))
    .join(' ');
};
