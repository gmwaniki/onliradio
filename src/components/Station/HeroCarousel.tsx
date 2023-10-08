'use client';
import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { TStation } from '../../util/playableStation';
import HeroStation from './HeroStation';

type TProps = {
  stations: TStation[];
};
export default function HeroCarousel({ stations }: TProps) {
  const [index, setIndex] = useState(0);
  const station = stations[index];

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

  return (
    <div className='text-CustomWhite pt-2'>
      <div className='relative scrollbar grid grid-rows-[min-content,1fr]  grid-cols-[.3fr,1fr,.3fr] lg:grid-rows-1  lg:gap-5'>
        <m.button
          onClick={decrementIndex}
          className=' absolute left-5 z-10 self-center justify-self-center bg-CustomBlack border border-CustomWhite rounded-full p-2 lg:static lg:bg-CustomLightBlack lg:p-5 lg:justify-self-end lg:border-0'
          whileHover={{ scale: 1.25 }}
        >
          <HiChevronLeft className='text-3xl' />
        </m.button>
        <div className='col-span-full col-start-1 row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 '>
          <AnimatePresence initial={false} mode='wait'>
            <HeroStation station={station} key={station.stationuuid} />
          </AnimatePresence>
        </div>
        <m.button
          onClick={incrementIndex}
          className='absolute right-5 z-10 col-start-3 self-center justify-self-center bg-CustomBlack border border-CustomWhite  rounded-full p-2 lg:static lg:bg-CustomLightBlack lg:p-5 lg:justify-self-start lg:border-0'
          whileHover={{ scale: 1.25 }}
        >
          <HiChevronRight className='text-3xl ' />
        </m.button>
      </div>
    </div>
  );
}
