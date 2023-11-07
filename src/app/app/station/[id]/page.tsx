import { Metadata, ResolvingMetadata } from 'next';

import StationPage from '@/components/Station/StationPage';
import { getUrl } from '@/util/getUrl';
import { TStation } from '@/util/playableStation';

type Props = {
  params: { id: string };
};

const getStation = async (id: string) => {
  try {
    const url = await getUrl();
    const query = `${url}/stations/byuuid?uuids=${id}`;
    const result = await fetch(query);
    const station = (await result.json()) as TStation[];
    return station;
  } catch (error) {
    return [] as TStation[];
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const stations = await getStation(params.id);
  const station = stations[0];

  return <StationPage station={station} />;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const stations = await getStation(id);
  const station = stations[0];
  const previousImages = (await parent).openGraph?.images || [];

  const stationurl = `${
    process.env.NODE_ENV === 'production'
      ? `https://onliradio.vercel.app`
      : 'http://localhost:3000'
  }/app/search?name=${encodeURIComponent(station.name)}&language=${
    station.language.split(',')[0]
  }&country=${station.country}`;
  return {
    applicationName: 'Onliradio',
    title: 'Onliradio',
    keywords: station.tags?.split(',').slice(0, 3),
    authors: { name: 'George Mwaniki', url: 'gmwaniki.com' },
    metadataBase: new URL(
      process.env.NODE_ENV === 'production'
        ? `https://onliradio.vercel.app`
        : 'http://localhost:3000'
    ),
    openGraph: {
      title: station.name,
      description: 'Listen to all your favorite radio stations in one app',
      url: stationurl,
      siteName: 'Onliradio',

      images: [
        {
          url: '/images/logo/profile.png',
          width: 1000,
          height: 1000,
        },
        ...previousImages,
      ],
      locale: 'en_GB',
      type: 'website',
    },
  };
}
