'use client';
import Image from 'next/image';
import React, { useContext, useRef } from 'react';
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
  const audioRef = useRef<HTMLAudioElement>(null);
  // const [like, setLike] = useState<boolean>(false);
  const {} = useAudio(audioRef);
  const { like, unlike, isliked } = useLikes(station.stationId);

  // useEffect(() => {
  //   const localLikes = localStorage.getItem('likes');

  //   if (localLikes !== null) {
  //     const likes: Array<string> = JSON.parse(localLikes);
  //     likes.indexOf(station.stationId) === -1 ? setLike(false) : setLike(true);
  //   }
  //   if (station.stationId) {
  //     const localHistory = localStorage.getItem('history');
  //     if (localHistory === null) {
  //       localStorage.setItem('history', JSON.stringify([station.stationId]));
  //     } else {
  //       const stationsHistory: string[] = JSON.parse(localHistory);
  //       const historySet = new Set([...stationsHistory]);
  //       historySet.add(station.stationId);
  //       localStorage.setItem('history', JSON.stringify([...historySet]));
  //     }
  //   }
  // }, [station.stationId]);

  // useEffect(() => {
  //   const storage = localStorage.getItem('likes');
  //   if (storage !== null) {
  //     const likes: Array<string> = JSON.parse(storage);
  //     const stationIndex = likes.includes(station.stationId);
  //     if (!like && stationIndex) {
  //       const likeSet = new Set([...likes]);
  //       likeSet.delete(station.stationId);
  //       localStorage.setItem('likes', JSON.stringify([...likeSet]));
  //     }
  //     if (like && !stationIndex) {
  //       localStorage.setItem(
  //         'likes',
  //         JSON.stringify([...likes, station.stationId])
  //       );
  //     }
  //   } else {
  //     if (station.stationId && like) {
  //       localStorage.setItem('likes', JSON.stringify([station.stationId]));
  //     }
  //   }
  // }, [like, station.stationId]);

  if (station.stationId === '') {
    return null;
  }

  return (
    <div className='fixed bottom-[82px] z-20 w-full  text-CustomWhite  sm:sticky sm:bottom-1'>
      <div className='mx-[10px] bg-CustomLightBlack/80 backdrop-blur-sm p-3 rounded grid grid-cols-[auto_repeat(2,minmax(0,1fr))] gap-x-2 sm:mx-3'>
        <Image
          src={
            station.favicon
              ? `/api/image?url=${encodeURIComponent(station.favicon)}`
              : '/musicnote.svg'
          }
          alt='music note'
          width={55}
          height={55}
          className='object-contain min-w-[55px] min-h-[55px] rounded'
          onError={(e) => {
            e.currentTarget.src = '/musicnote.svg';
          }}
        />
        <div className='flex flex-col'>
          <p>{station.name}</p>
          <p>{getFlagEmoji(station.countryCode)}</p>
        </div>
        <div className='flex justify-end items-center gap-x-2'>
          <button
            type='button'
            aria-label='like Channel'
            onClick={() => {
              isliked ? unlike(station.stationId) : like(station.stationId);
            }}
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
          {/* <button
            type='button'
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={() => {
              dispatch({ type: StationReducerActionType.TOGGLE });
            }}
          >
            {isPlaying ? (
              <HiPause className='text-5xl fill-CustomActive' />
            ) : (
              <HiPlay className='text-5xl' />
            )}
          </button> */}
          <audio
            src={station.stationurl}
            ref={audioRef}
            className='hidden'
          ></audio>
        </div>
      </div>
    </div>
  );
}
