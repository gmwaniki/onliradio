'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useContext } from 'react';
import { HiOutlineHeart } from 'react-icons/hi';
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
      className='fixed bottom-[90px] z-20 w-full  text-CustomWhite   sm:sticky sm:bottom-2  place-self-end '
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{}}
    >
      <div className='mx-2  bg-CustomLightBlack/80 backdrop-blur-sm p-3 rounded grid grid-flow-col  sm:grid-cols-[1fr,auto,1fr]  justify-between items-center gap-x-2 sm:ml-3'>
        <div className='grid grid-flow-col auto-cols-min items-center gap-x-2 '>
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
          <div className='flex flex-col justify-center'>
            <div className='flex gap-x-3'>
              <p className='relative whitespace-nowrap text-ellipsis overflow-hidden max-w-[150px] sm:max-w-[min(100%,200px)]'>
                {station.name}
              </p>
              <button
                type='button'
                aria-label='like Channel'
                onClick={handleLikeClick}
                className='col-start-2 '
              >
                <HiOutlineHeart
                  className={`w-5 h-5  ${
                    isliked ? 'fill-CustomActive' : ''
                  } stroke-CustomActive hover:fill-CustomActive c`}
                />
              </button>
            </div>
            <div className='flex gap-x-4 items-center'>
              <p>
                {station.countryCode
                  ? getFlagEmoji(station.countryCode)
                  : 'N/A'}
              </p>
              <p
                className={`${
                  isError ? 'text-red-500 border-red-500' : ''
                } uppercase border border-green-500 text-green-500 rounded p-1 text-xs w-min sm:hidden`}
              >
                {status}
              </p>
            </div>
          </div>
        </div>
        <div className='justify-self-stretch w-full row-span-2'>
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
              <MdOutlinePlayArrow className='w-12 h-12  fill-CustomActive' />
            </Button>
          )}
        </div>
        {/* <div className='flex justify-end items-center gap-x-2'> */}

        <div className='hidden sm:flex sm:flex-col sm:gap-y-2 sm:text-center sm:items-end pr-5'>
          <p
            className={`${
              isError ? 'text-red-500 border-red-500' : ''
            } uppercase border border-green-500 text-green-500 rounded p-1 text-sm`}
          >
            {status}
          </p>
          {/* <p className='text-sm'>{playtime}</p> */}
        </div>
      </div>

      {/* </div> */}
    </motion.div>
  );
}
