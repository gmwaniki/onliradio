'use client';
import { useEffect, useState } from 'react';

import { TStation } from '../../util/playableStation';
import Station from '../Station/Station';

type TProps = {
  url: string;
};

export default function HistoryStations({ url }: TProps) {
  const [stations, setStations] = useState<TStation[]>([]);

  useEffect(() => {
    const likedStations = localStorage.getItem('history');
    const getStations = async () => {
      if (likedStations === null) {
        return;
      }
      const stationIds: string[] = JSON.parse(likedStations);
      try {
        const result = await fetch(
          `${url}/stations/byuuid?uuids=${stationIds.join(',')}`
        );
        const resultStations = (await result.json()) as TStation[];
        setStations(resultStations);
      } catch (error) {
        setStations([]);
      }
    };
    getStations();
  }, [url]);
  return (
    <>
      {stations.map((station) => {
        return (
          <li key={station.stationuuid}>
            <Station station={station} />
          </li>
        );
      })}
    </>
  );
}
