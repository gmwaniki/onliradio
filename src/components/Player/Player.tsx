'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useContext } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { MdOutlinePause, MdOutlinePlayArrow } from 'react-icons/md';

import useAudio from '../../app/hooks/useAudio';
import useLikes from '../../app/hooks/useLikes';
import {
  AudioContext,
  StationReducerActionType,
} from '../../app/providers/AudioContext';
import getFlagEmoji from '../../util/getFlagEmoji';
import Button from './Button';

export default function Player() {
  const { state, dispatch } = useContext(AudioContext);
  const { station, isPlaying } = state;
  const { isError, status, playtime } = useAudio();
  const [isliked, _stations, like, unlike] = useLikes(station.stationId);

  // const timepassed = useMemo(() => {
  //   const minutes = playtime / 60;
  //   const hours = minutes / 60;
  //   const seconds = playtime - minutes * 60;
  //   console.log(hours.toPrecision(3), minutes., seconds.toFixed(2));
  // }, [playtime]);

  const handleLikeClick = (_e: React.SyntheticEvent<HTMLButtonElement>) => {
    if (isliked) {
      unlike();
    } else {
      like();
    }
    return;
  };

  if (station.stationId === '') {
    return null;
  }

  return (
    <motion.div
      className='fixed bottom-[90px] z-20 w-full  text-CustomWhite   sm:sticky sm:bottom-2  place-self-end'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{}}
    >
      <div className='mx-2 bg-CustomLightBlack/80 backdrop-blur-sm p-3 rounded grid grid-cols-2  lg:grid-cols-[minmax(0,1fr),auto,minmax(0,1fr)] auto-cols-min justify-between gap-x-2 sm:mx-3'>
        <div className='grid grid-flow-col auto-cols-min items-center gap-x-2'>
          <Image
            src={`/api/image?url=${encodeURIComponent(station.favicon)}`}
            alt='music note'
            width={55}
            height={55}
            priority={true}
            className='object-contain min-w-[55px] min-h-[55px] rounded'
            onError={(e) => {
              e.currentTarget.src = '/musicnote.svg';
            }}
          />
          <div className='flex flex-col '>
            <p className='whitespace-nowrap text-ellipsis overflow-hidden max-w-[150px] sm:max-w-[min(100%,200px)]'>
              {station.name}
            </p>
            <p>
              {station.countryCode ? getFlagEmoji(station.countryCode) : 'N/A'}
            </p>
          </div>
        </div>
        <div className='hidden lg:flex lg:flex-col sm:gap-y-2 sm:text-center sm:justify-center sm:items-center '>
          <p
            className={`${
              isError ? 'text-red-500 border-red-500' : ''
            } uppercase border border-green-500 text-green-500 rounded p-1 text-sm`}
          >
            {status}
          </p>
          {/* <p className='text-sm'>{playtime}</p> */}
        </div>
        <div className='flex justify-end items-center gap-x-2'>
          <button
            type='button'
            aria-label='like Channel'
            onClick={handleLikeClick}
          >
            {isliked ? (
              <HiHeart className='w-12 h-12 text-CustomActive ' />
            ) : (
              <HiOutlineHeart className='w-12 h-12  ' />
            )}
          </button>
          {isPlaying ? (
            <Button
              status='Pause'
              func={() => {
                dispatch({ type: StationReducerActionType.PAUSE });
              }}
            >
              <MdOutlinePause className='w-12 h-12 fill-CustomActive' />
            </Button>
          ) : (
            <Button
              status='Play'
              func={() => {
                dispatch({
                  type: StationReducerActionType.PLAY,
                  payload: station,
                });
              }}
            >
              <MdOutlinePlayArrow className='w-12 h-12' />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
