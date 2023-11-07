import Station from '@/components/Station/Station';
import { getUrl } from '@/util/getUrl';
import { TStation } from '@/util/playableStation';

const getMostPlayedStations = async (url: string) => {
  const stations = await fetch(
    `${url}/stations/search?order=clickcount&hidebroken=true&is_https=true&limit=10&reverse=true`
  );
  return stations.json() as Promise<TStation[]>;
};

export default async function Page() {
  const url = await getUrl();
  const stations = await getMostPlayedStations(url);
  return (
    <section className='text-CustomWhite'>
      <h1 className='text-center font-semibold text-2xl py-2'>
        Most Played Stations
      </h1>
      <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)] items-center justify-center gap-y-5 gap-x-3 lg:grid-cols-[repeat(3,minmax(275px,1fr))]'>
        {stations.map((station) => {
          return (
            <li key={station.stationuuid}>
              <Station station={station} key={station.stationuuid} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
