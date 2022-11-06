import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  HiOutlineHeart,
  HiOutlineMusicNote,
  HiPause,
  HiPlay,
  HiVolumeUp,
} from 'react-icons/hi';

import {
  StationContext,
  StationReducerActionType,
  TActiveStation,
  TStationAction,
} from '../../Context/AudioContext';
import useGetStation from '../../hooks/useGetStation';

import getFlagEmoji from '../../util/getFlagEmoji';
import { TStation, TstationApp } from '../../util/playableStation';
import Spinner from '../Spinner/Spinner';

type TPlayerProps = {
  state: TActiveStation;
  isPlaying: boolean;
};
const Player = ({ state, isPlaying }: TPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStatus, setAudioStatus] = useState({ status: '', message: '' });
  const { dispatch, dispatchStoreStation } = useContext(StationContext);

  useEffect(() => {
    const audio = audioRef.current;
    console.log('Loading audio');
    if (audio && isPlaying) {
      audio.load();
      audio.play().catch((error) => {
        //TODO handle error
      });
    }
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [isPlaying, state]);

  useEffect(() => {
    if ('mediaSession' in navigator && state) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: state.name,
        artwork: [
          {
            src: `/images/logo/favicon/icon.jpg`,
            sizes: '256x256',
            type: 'image/jpg',
          },
          {
            src: `/images/heroop.webp`,
            sizes: '512x512',
            type: 'image/jpg',
          },
        ],
      });

      navigator.mediaSession.setActionHandler('play', function () {
        dispatch({
          type: StationReducerActionType.PLAY,
          payload: { ...state },
        });
      });
      navigator.mediaSession.setActionHandler('pause', function () {
        dispatch({
          type: StationReducerActionType.PAUSE,
        });
      });
      navigator.mediaSession.setActionHandler('stop', function () {
        dispatch({
          type: StationReducerActionType.PAUSE,
        });
      });
    }
    const spaceBarDown = (e: globalThis.KeyboardEvent) => {
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target === document.body) {
          e.preventDefault();
        }
      });
    };

    const keyuplistenter = (e: globalThis.KeyboardEvent) => {
      if (
        e.code !== 'Space' ||
        audioRef.current === null ||
        audioRef.current.currentTime === 0
      ) {
        return;
      }

      if (e.target == document.body) {
        e.preventDefault();
      }

      dispatch({
        type: StationReducerActionType.TOGGLE,
      });

      return;
    };
    addEventListener('keyup', keyuplistenter, { capture: true });
    addEventListener('keydown', spaceBarDown, { capture: true });
    return () => {
      removeEventListener('keyup', keyuplistenter);
      removeEventListener('keydown', spaceBarDown);
    };
  }, [dispatch, state]);

  if (state === undefined) {
    return <></>;
  }

  const { name, favicon, stationurl, countryCode, stationId } = state;
  const handleAudioLoadStart = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (isPlaying === false) {
      setAudioStatus({ status: 'paused', message: 'Paused' });
      return;
    }

    setAudioStatus({ status: 'loading', message: 'Connecting...' });
  };
  const handleAudioPlaying = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    dispatchStoreStation({
      type: 'storeStation',
      payload: stationId,
    });
    setAudioStatus({ status: 'playing', message: 'Playing' });
  };
  const handleAudioPause = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (e.currentTarget.error) {
      if (e.currentTarget.error.code === 2) {
        e.currentTarget.load();
        dispatch({
          type: StationReducerActionType.PLAY,
          payload: { ...state },
        });
        return;
      }
      setAudioStatus({
        status: 'error',
        message: 'An error occured',
      });

      dispatch({
        type: StationReducerActionType.PAUSE,
      });
      return;
    }
    setAudioStatus({ status: 'paused', message: 'Paused' });
  };

  return (
    <section className='fixed right-0 left-0 bottom-2  z-10 text-CustomTextGrey  grid place-items-center px-2'>
      <div className='grid grid-cols-[1fr_auto_1fr] justify-between bg-CustomBackgroundBlack/50 backdrop-blur container sm:grid-cols-[1fr_1fr_1fr_auto]  py-1 pl-2 pr-1  gap-6 rounded-md'>
        <div className='grid grid-cols-[auto_1fr] items-center gap-1 sm:gap-2'>
          <div className='w-[50px]'>
            {favicon ? (
              <picture className='w-[30%]'>
                <img
                  src={`/api/image?url=${favicon}`}
                  alt={'woow'}
                  width='100%'
                  className='object-contain rounded'
                />
              </picture>
            ) : (
              <HiOutlineMusicNote className='w-full h-full svgthin' />
            )}
          </div>
          <div className='overflow-x-hidden overflow-y-auto '>
            <p className='text-sm  Capitalize whitespace-nowrap sm:overflow-hidden hover:animate-none sm:text-base md:animate-none sm:text-ellipsis w-fit animate-marqueetext'>
              <span className=''>{name}</span>
            </p>
            <div className='hidden overflow-x-hidden sm:grid  sm:grid-cols-[1fr_auto] sm:gap-2'>
              {getFlagEmoji(countryCode) || '🤷'}
            </div>
          </div>
        </div>
        <button
          className='text-5xl self-center justify-self-center grid grid-rows-[auto_auto]  justify-items-center'
          onClick={() => {
            dispatch({
              type: StationReducerActionType.TOGGLE,
            });
          }}
        >
          <audio
            src={stationurl}
            ref={audioRef}
            onLoadStart={handleAudioLoadStart}
            onPlaying={handleAudioPlaying}
            onPause={handleAudioPause}
            onError={(e) => {
              e.preventDefault();
              setAudioStatus({
                status: 'error',
                message: 'An error occured',
              });
            }}
          />
          {isPlaying ? (
            <HiPause className='fill-CustomActivePurple' />
          ) : (
            <HiPlay className='fill-CustomActivePurple  stroke-CustomActivePurple' />
          )}
          <span
            className={`inline-block text-sm ${
              audioStatus.status === 'error' && 'text-red-600'
            }`}
          >
            {audioStatus.message}
          </span>
        </button>
        <div className='hidden  sm:grid grid-cols-[repeat(2,auto)] items-center justify-center gap-2 sm:justify-self-end'>
          <HiVolumeUp className='text-3xl' />
          <input type='range' name='' id='' />
        </div>
        <button className='justify-self-end sm:self-center sm:justify-self-center'>
          <HiOutlineHeart className='text-5xl sm:text-4xl svgthin hover:fill-CustomActivePurple hover:stroke-CustomActivePurple' />
        </button>
      </div>
    </section>
  );
};

export default Player;
