type TInputValues = {
  name: string;
  country: string;
  language: string;
  genre: string;
};
type TgetStation = (url: string, searchValues: TInputValues) => string;
export const getStationsUrl: TgetStation = (url, searchValues, filters) => {
  const getUrl = new URL(`${url}/stations/search`);
  getUrl.searchParams.set('limit', '15');
  getUrl.searchParams.set('order', 'votes');
  getUrl.searchParams.set('reverse', 'true');
  getUrl.searchParams.set('is_https', 'true');
  getUrl.searchParams.set('hidebroken', 'true');
  if (searchValues.name) {
    getUrl.searchParams.set('name', stringCapitalize(searchValues.name));
  }
  if (searchValues.country) {
    getUrl.searchParams.set('country', stringCapitalize(searchValues.country));
  }
  if (searchValues.language) {
    getUrl.searchParams.set('language', searchValues.language);
  }
  if (searchValues.genre) {
    getUrl.searchParams.set('tag', searchValues.genre);
  }

  return getUrl.href;
};
export const stringCapitalize = (value: string): string => {
  return value
    .trim()
    .split(' ')
    .map((item) => item[0].toUpperCase() + item.substring(1))
    .join(' ');
};
