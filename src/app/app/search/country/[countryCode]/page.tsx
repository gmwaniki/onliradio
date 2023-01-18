import Station from '../../../../../components/Station/Station';
import { getUrl } from '../../../../../util/getUrl';
import { TStation } from '../../../../../util/playableStation';

const getStationsInCountry = async (url: string, countryCode: string) => {
  const stations = await fetch(
    `${url}/stations/search?order=votes&countrycode=${countryCode}&hidebroken=true&is_https=true&limit=10&reverse=true`
  );
  return stations.json() as Promise<TStation[]>;
};

export default async function Page({
  params,
}: {
  params: { countryCode: string };
}) {
  const url = await getUrl();

  const stations = await getStationsInCountry(url, params?.countryCode || 'ke');

  if (stations.length === 0) {
    return (
      <section className='text-CustomWhite'>
        <h1 className='text-3xl text-center'> No results Found</h1>
      </section>
    );
  }

  return (
    <section className='text-CustomWhite'>
      <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)] items-center justify-center gap-y-5 gap-x-3 py-5'>
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
