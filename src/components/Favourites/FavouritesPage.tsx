'use client';

import { useQuery } from '@tanstack/react-query';

import useLikes from '../../app/hooks/useLikes';
import { TStation } from '../../util/playableStation';
import Station from '../Station/Station';

type TProps = {
  url: string;
};

export default function FavouritesPage({ url }: TProps) {
  const [_isLiked, likes, _like, _unlike] = useLikes();
  const stationIds = likes
    ? Object.entries(likes)
        .filter((value) => value[1] === '1')
        .map((value) => value[0])
    : [];

  const getStations = async (): Promise<TStation[]> => {
    const result = await fetch(
      `${url}/stations/byuuid?uuids=${stationIds.join(',')}`
    );
    const resultStations = (await result.json()) as TStation[];
    return resultStations;
  };

  const stations = useQuery({
    queryKey: [...stationIds],
    queryFn: getStations,
  });

  // useEffect(() => {
  //   const likedStations = localStorage.getItem('likes');
  //   const getStations = async () => {
  //     if (likedStations === null) {
  //       return;
  //     }
  //     const stationIds: string[] = JSON.parse(likedStations);
  //     try {
  //       const result = await fetch(
  //         `${url}/stations/byuuid?uuids=${stationIds.join(',')}`
  //       );
  //       const resultStations = (await result.json()) as TStation[];
  //       setStations(resultStations);
  //     } catch (error) {
  //       setStations([]);
  //     }
  //   };
  //   getStations();
  // }, [url]);

  if (stations.isLoading) {
    return <span>Loading...</span>;
  }
  if (!stations.isSuccess) {
    return <span>An Error Occured</span>;
  }

  return (
    <>
      {stations.data.map((station) => {
        return (
          <li key={station.stationuuid}>
            <Station station={station} />
          </li>
        );
      })}
    </>
  );
}
