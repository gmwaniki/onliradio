'use client';
import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import {
  HiOutlineHeart,
  HiOutlinePause,
  HiOutlinePlay,
  HiOutlineStar,
} from 'react-icons/hi';

import useLikes from '../../app/hooks/useLikes';
import {
  AudioContext,
  StationReducerActionType,
} from '../../app/providers/AudioContext';
import { getCountryName } from '../../util/getCountries';
import getFlagEmoji from '../../util/getFlagEmoji';
import { TStation } from '../../util/playableStation';

type TProps = {
  station: TStation;
};

export default function Station({ station }: TProps) {
  const { dispatch, state } = useContext(AudioContext);
  const isCurrentStation = useMemo((): boolean => {
    if (state.station.stationId === station.stationuuid) {
      return state.isPlaying;
    } else {
      return false;
    }
  }, [state.station.stationId, station, state.isPlaying]);
  const [isliked, _, like, unlike] = useLikes(station.stationuuid);

  return (
    <div
      className='text-CustomWhite  h-full bg-CustomLightBlack grid gap-y-2 py-2 rounded group lg:grid-cols-[auto,minmax(0,1fr)] lg:px-4 lg:gap-x-5 '
      data-playing={isCurrentStation && state.isPlaying}
    >
      <div className=' w-full relative justify-self-center px-2 text-center  lg:justify-self-start lg:text-start lg:col-span-full lg:grid lg:grid-cols-[1fr,auto] lg:justify-between lg:gap-3 overflow-hidden text-ellipsis'>
        <p className=' w-full relative whitespace-nowrap  overflow-hidden text-ellipsis '>
          {station.name}
        </p>
        <button
          onClick={() => (isliked ? unlike() : like())}
          className='hidden lg:block'
          aria-label='Like station'
        >
          <HiOutlineHeart
            className={` ${
              isliked ? 'fill-CustomActive ' : ''
            } stroke-CustomActive  `}
          />
        </button>
      </div>
      <div className='justify-self-center relative lg:col-start-1 lg:justify-self-start'>
        <Image
          src={`/api/image?url=${encodeURIComponent(station.favicon)}`}
          alt={'musicnote'}
          width={70}
          height={70}
          quality={50}
          className='object-contain min-w-[70px] min-h-[70px] rounded '
          priority={true}
        />
        <span className='absolute w-6 h-6 text-center  -top-1 -right-1 bg-CustomLightBlack  rounded-full  ring-1 ring-CustomActive lg:hidden'>
          {getFlagEmoji(station.countrycode) || '🤷'}
        </span>
      </div>
      <div className='px-4 pb-1 h-full'>
        <div className=' hidden text-[1rem] lg:grid lg:grid-rows-2  '>
          <p
            className='whitespace-nowrap w-10/12 overflow-hidden text-ellipsis'
            title={getCountryName(station.countrycode)}
          >
            {getFlagEmoji(station.countrycode) || ''}{' '}
            {getCountryName(station.countrycode)}
          </p>
          <span className='flex items-center gap-x-1'>
            <HiOutlineStar />
            {station.votes.toLocaleString()}
          </span>
        </div>

        <button
          type='button'
          className='  text-base flex w-full text-CustomActive items-center justify-center border border-CustomActive p-1 rounded gap-x-2 transition-colors duration-300 hover:text-CustomLightBlack hover:bg-CustomActive hover:transition-colors hover:duration-300  group-data-[playing=true]:text-CustomActive group-data-[playing=true]:bg-CustomBlack lg:w-full lg:mt-2'
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
            <>
              Pause
              <HiOutlinePause className='childPath:stroke-1 text-2xl' />
            </>
          ) : (
            <>
              Play
              <HiOutlinePlay className='childPath:stroke-1 text-2xl' />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
