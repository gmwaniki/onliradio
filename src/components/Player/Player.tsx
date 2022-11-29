'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { HiHeart, HiOutlineHeart, HiPause, HiPlay } from 'react-icons/hi';
import { AudioContext, StationReducerActionType } from '../../app/AudioContext';
import getFlagEmoji from '../../util/getFlagEmoji';

export default function Player() {
  const { state, dispatch } = useContext(AudioContext);
  const { station, isPlaying } = state;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (isPlaying) {
        audioElement.load();
        audioElement.play().catch((error) => {
          audioElement.pause();
        });
      } else {
        audioElement.pause();
      }
    }

    return () => {};
  }, [station.stationId, isPlaying, dispatch]);

  useEffect(() => {
    const localLikes = localStorage.getItem('likes');

    if (localLikes !== null) {
      const likes: Array<string> = JSON.parse(localLikes);
      likes.indexOf(station.stationId) === -1 ? setLike(false) : setLike(true);
    }
    if (station.stationId) {
      const localHistory = localStorage.getItem('history');
      if (localHistory === null) {
        localStorage.setItem('history', JSON.stringify([station.stationId]));
      } else {
        const stationsHistory: string[] = JSON.parse(localHistory);
        const historySet = new Set([...stationsHistory]);
        historySet.add(station.stationId);
        localStorage.setItem('history', JSON.stringify([...historySet]));
      }
    }
  }, [station.stationId]);

  useEffect(() => {
    const storage = localStorage.getItem('likes');
    if (storage !== null) {
      const likes: Array<string> = JSON.parse(storage);
      const stationIndex = likes.includes(station.stationId);
      if (!like && stationIndex) {
        const likeSet = new Set([...likes]);
        likeSet.delete(station.stationId);
        localStorage.setItem('likes', JSON.stringify([...likeSet]));
      }
      if (like && !stationIndex) {
        localStorage.setItem(
          'likes',
          JSON.stringify([...likes, station.stationId])
        );
      }
    } else {
      if (station.stationId && like) {
        localStorage.setItem('likes', JSON.stringify([station.stationId]));
      }
    }
  }, [like, station.stationId]);

  if (station.stationId === '') {
    return null;
  }

  return (
    <div className='fixed bottom-20 z-20 w-full  text-CustomWhite sm:sticky sm:bottom-0 '>
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
              setLike(!like);
            }}
          >
            {like ? (
              <HiHeart className='text-5xl text-CustomActive childPath:stroke-1' />
            ) : (
              <HiOutlineHeart className='text-5xl text-CustomActive childPath:stroke-1' />
            )}

            {/* <HiHeart className='text-5xl text-CustomActive' /> */}
          </button>
          <button
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
          </button>
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
