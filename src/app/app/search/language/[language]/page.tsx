import Search from '../../../../../components/Search/Search';
import Station from '../../../../../components/Station/Station';
import { getUrl } from '../../../../../util/getUrl';
import { TStation } from '../../../../../util/playableStation';

const getStationsInLanguage = async (url: string, language: string) => {
  const stations = await fetch(
    `${url}/stations/search?order=votes&language=${language}&hidebroken=true&is_https=true&limit=10&reverse=true`
  );
  return stations.json() as Promise<TStation[]>;
};

export default async function Page({
  params,
}: {
  params: { language: string };
}) {
  const url = await getUrl();

  const stations = await getStationsInLanguage(url, params.language);

  if (stations.length === 0) {
    return (
      <section className='text-CustomWhite'>
        <h1 className='text-3xl text-center'> No results Found</h1>
      </section>
    );
  }

  return (
    <section className='text-CustomWhite'>
      <Search />
      <h1 className='text-center font-semibold text-2xl py-2'>
        Stations in {params.language}
      </h1>

      <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)] items-center justify-center gap-y-5 gap-x-3'>
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
