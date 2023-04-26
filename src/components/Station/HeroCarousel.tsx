'use client';
import { useMemo, useState } from 'react';

import { TStation } from '../../util/playableStation';
import HeroStation from './HeroStation';

type TProps = {
  stations: TStation[];
};
export default function HeroCarousel({ stations }: TProps) {
  const [index, setIndex] = useState(0);

  const incrementIndex = () => {
    const nextStation = stations[index + 1];
    if (nextStation === undefined) {
      setIndex(0);
      return;
    }

    setIndex((index) => index + 1);
  };
  const decrementIndex = () => {
    const nextStation = stations[index - 1];
    if (nextStation === undefined) {
      setIndex(stations.length - 1);
      return;
    }

    setIndex((index) => index - 1);
  };
  const leftStyle = useMemo(() => {
    return `left-${index}00`;
  }, [index]);
  // const station = stations[index];

  return (
    <div className='text-CustomWhite pt-6'>
      <div className='relative scrollbar flex justify-center'>
        <ul className='grid grid-flow-col auto-cols-[min(500px,83%)] snap-x snap-mandatory snap- h-full gap-5  sm:gap-12 overflow-x-auto  scrollbar max-w-7xl rounded-md'>
          {stations.map((station) => {
            return (
              <li
                key={station.stationuuid}
                className={`inline-flex snap-center flex-1 max-h-[350px] `}
                id={station.stationuuid}
              >
                <HeroStation station={station} key={station.stationuuid} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
