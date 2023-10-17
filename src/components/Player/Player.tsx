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
  const [isliked, _stations, like, unlike] = useLikes(station.stationId);

  // console.log(isliked);
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
    <div className='fixed bottom-[90px] z-20 w-full  text-CustomWhite   sm:sticky sm:bottom-2  place-self-end'>
      <div className='mx-2 bg-CustomLightBlack/80 backdrop-blur-sm p-3 rounded grid grid-cols-[auto_repeat(2,minmax(0,1fr))] gap-x-2 sm:mx-3'>
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
        <div className='flex flex-col'>
          <p>{station.name}</p>
          <p>{getFlagEmoji(station.countryCode)}</p>
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
