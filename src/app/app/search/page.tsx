import SearchPage from '../../../components/Search/SearchPage';
import { getStationsUrl } from '../../../util/getStationsUrl';
import { getUrl } from '../../../util/getUrl';
import { TStation } from '../../../util/playableStation';

const getSearchStations = async (
  url: string,
  searchParams?: {
    name: string;
    genre: string;
    country: string;
    language: string;
  }
) => {
  if (searchParams) {
    const { country, genre, language, name } = searchParams;
    if (
      Boolean(country) ||
      Boolean(genre) ||
      Boolean(language) ||
      Boolean(name)
    ) {
      const stationsUrl = getStationsUrl(url, {
        country,
        genre,
        language,
        name,
      });
      const results = await fetch(stationsUrl);
      return results.json() as Promise<TStation[]>;
    }
  }
  return [];
};

export const revalidate = 0;

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    name: string;
    genre: string;
    country: string;
    language: string;
  };
}) {
  const url = await getUrl();

  const stations = await getSearchStations(url, searchParams);

  return <SearchPage url={url} stations={stations} />;
}
