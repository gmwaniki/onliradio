import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import { HiOutlinePause, HiOutlinePlay, HiOutlineStar } from 'react-icons/hi';

import {
  AudioContext,
  StationReducerActionType,
} from '../../app/providers/AudioContext';
import { getCountryName } from '../../util/getCountries';
import getFlagEmoji from '../../util/getFlagEmoji';
import { TStation } from '../../util/playableStation';
import Tag from './Tag';

type HeroStationProps = {
  station: TStation;
};
const HeroStation = ({ station }: HeroStationProps) => {
  const { dispatch, state } = useContext(AudioContext);
  const isCurrentStation = useMemo((): boolean => {
    if (state.station.stationId === station.stationuuid) {
      return state.isPlaying;
    } else {
      return false;
    }
  }, [state.station.stationId, station, state.isPlaying]);
  const tags = useMemo(() => {
    return station.tags.split(',').slice(0, 2);
  }, [station.tags]);

  const date = useMemo(() => {
    const newDate = new Date(station.lastcheckoktime_iso8601);
    const month = new Intl.DateTimeFormat(undefined, { month: 'short' }).format(
      newDate
    );

    return `${month}, ${newDate.getDate()} ${newDate.getFullYear()}`;
  }, [station.lastcheckoktime_iso8601]);

  return (
    <motion.div
      className=' bg-CustomLightBlack p-4  h-full w-full rounded-sm   grid grid-rows-[repet(3,auto)] lg:@xs:grid-rows-[repeat(3,auto)]  gap-2 lg:p-8 lg:grid-cols-3 lg:grid-rows-[auto,1fr,1.5fr] gap-x-8 '
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'spring', duration: 0.25 }}
      exit={{ opacity: 0 }}
      drag='x'
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
    >
      <ul className='flex gap-4 items-start justify-start col-start-1 row-start-1 lg:@xs:col-span-full  lg:col-start-2 lg:col-span-full'>
        {tags.map((tag, index) => {
          return tag ? (
            <Tag tag={tag} key={index} />
          ) : (
            <Tag tag='music' key={index} />
          );
        })}
      </ul>

      <Image
        src={`/api/image?url=${encodeURIComponent(station.favicon)}`}
        alt={station.name}
        width={130}
        height={130}
        onError={(e) => {
          e.currentTarget.src = '/musicnote.svg';
        }}
        priority={true}
        className='rounded-md aspect-square justify-self-center lg:@xs:row-start-2 lg:row-span-full  lg:self-center md:w-60 2xl:w-96'
      />

      <div className='grid grid-cols-[minmax(0,1fr),minmax(0,.5fr)] lg:col-start-2 lg:col-span-full lg:row-start-2 lg:row-span-full justify-center items-center'>
        <div className=' lg:text-xl'>
          <p
            className='text-stationTitle font-bold text-ellipsis overflow-x-hidden whitespace-nowrap overflow-y-clip '
            title={station.name}
          >
            {station.name}
          </p>
          <p className='hidden sm:block'>
            {station.countrycode
              ? `${getCountryName(station.countrycode)}  ${getFlagEmoji(
                  station.countrycode
                )}`
              : ' N/A'}
          </p>
          <p>
            <span className='capitalize'>{station.language || 'English'}</span>
          </p>

          <span className='flex items-center gap-x-1'>
            <HiOutlineStar />
            {station.votes.toLocaleString()}
          </span>
          <p className='hidden lg:block'>
            Codec: {station.codec}{' '}
            {station.bitrate ? `${station.bitrate} kbps` : null}
          </p>
          <p className='hidden lg:block'>Last Check: {date}</p>
        </div>
        <button
          type='button'
          aria-label={`Play ${station.name}`}
          className=' aspect-square max-w-[140px]'
          onClick={() => {
            if (isCurrentStation && state.isPlaying) {
              dispatch({
                type: StationReducerActionType.PAUSE,
              });
              return;
            }
            dispatch({
              type: StationReducerActionType.PLAY,
              payload: {
                countryCode: station.countrycode,
                favicon: station.favicon,
                name: station.name,
                stationId: station.stationuuid,
                stationurl: station.url_resolved,
                votes: station.votes,
                hls: station.hls,
              },
            });
          }}
        >
          {isCurrentStation ? (
            <HiOutlinePause className='w-full h-full aspect-square childPath:stroke-1  sm:childPath:stroke-[0.5] stroke-CustomActive ' />
          ) : (
            <HiOutlinePlay className='w-full h-full aspect-square childPath:stroke-1  sm:childPath:stroke-[0.5]  stroke-CustomActive' />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default HeroStation;
