import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  HiOutlineHeart,
  HiOutlineMusicNote,
  HiPause,
  HiPlay,
  HiVolumeUp,
} from 'react-icons/hi';
import {
  stationContext,
  StationReducerActionType,
  useStationState,
} from '../../Context/AudioContext';
import getFlagEmoji from '../../util/getFlagEmoji';

const Player = () => {
  const { dispatch } = useContext(stationContext);
  const { state } = useStationState();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStatus, setAudioStatus] = useState({
    status: '',
    message: '',
  });
  useEffect(() => {
    const audio = audioRef.current;
    if (state && audio && state.isPlaying) {
      audio.load();
      audio.play().catch((error) => {
        //TODO handle error
      });
    }
    return () => {
      if (state && audio) {
        audio.pause();
      }
    };
  }, [state]);

  useEffect(() => {
    if (!state) {
      return;
    }
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: state?.name,
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
          payload: state,
        });
      });
      navigator.mediaSession.setActionHandler('pause', function () {
        dispatch({
          type: StationReducerActionType.PAUSE,
          payload: state,
        });
      });
      navigator.mediaSession.setActionHandler('stop', function () {
        dispatch({
          type: StationReducerActionType.PAUSE,
          payload: state,
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
        payload: state,
      });

      return;
    };
    addEventListener('keyup', keyuplistenter);
    addEventListener('keydown', spaceBarDown);
    return () => {
      removeEventListener('keyup', keyuplistenter);
      removeEventListener('keydown', spaceBarDown);
    };
  }, [state, dispatch]);
  if (!state) return <div></div>;
  const handleAudioLoadStart = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (state !== null && state.isPlaying === false) {
      setAudioStatus({ status: 'paused', message: 'Paused' });
      return;
    }
    setAudioStatus({ status: 'loading', message: 'Connecting...' });
  };
  const handleAudioPlaying = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    setAudioStatus({ status: 'playing', message: 'Playing' });
  };
  const handleAudioPause = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (e.currentTarget.error) {
      if (e.currentTarget.error.code === 2) {
        e.currentTarget.load();
        dispatch({
          type: StationReducerActionType.PLAY,
          payload: state,
        });
        return;
      }
      setAudioStatus({
        status: 'error',
        message: 'An error occured',
      });

      dispatch({
        type: StationReducerActionType.PAUSE,
        payload: state,
      });
      return;
    }
    setAudioStatus({ status: 'paused', message: 'Paused' });
  };

  const { country, name, favicon, url_resolved, countrycode } = state;
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
              {getFlagEmoji(countrycode) || '🤷'}
            </div>
          </div>
        </div>
        <button
          className='text-5xl self-center justify-self-center grid grid-rows-[auto_auto]  justify-items-center'
          onClick={() => {
            dispatch({
              type: StationReducerActionType.TOGGLE,
              payload: state,
            });
          }}
        >
          <audio
            src={url_resolved}
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
          {state.isPlaying ? (
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
