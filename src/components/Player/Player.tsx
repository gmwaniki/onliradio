import { stat } from 'fs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  HiOutlineHeart,
  HiOutlineMusicNote,
  HiOutlinePlay,
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
      audio.play();
    }
    return () => {
      if (state && audio) {
        audio.pause();
        audio.load();
      }
    };
  }, [state?.isPlaying, state]);

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
    setAudioStatus({ status: 'paused', message: 'Paused' });
  };

  if (!state) return <div></div>;
  const { country, name, favicon, url_resolved, countrycode } = state;
  return (
    <section className='fixed right-0 left-0 bottom-2  z-10 text-CustomTextGrey  grid place-items-center px-2'>
      <div className='grid grid-cols-[1fr_auto_1fr] justify-between bg-CustomBackgroundBlack container sm:grid-cols-[minmax(auto,.7fr)_1fr_auto_auto]  py-1 pl-2 pr-1  gap-6 rounded-md'>
        <div className='grid grid-cols-[auto_auto] items-center gap-1 sm:gap-2'>
          <div className='w-[50px]'>
            {favicon ? (
              <picture className='w-[30%]'>
                <img
                  src={favicon}
                  alt={'woow'}
                  width='100%'
                  className='object-contain'
                />
              </picture>
            ) : (
              <HiOutlineMusicNote className='w-full h-full svgthin' />
            )}
          </div>
          <div className='overflow-x-hidden overflow-y-auto'>
            <p className='Capitalize whitespace-nowrap animate-marqueetext hover:animate-none'>
              {name}
            </p>
            <div className='hidden overflow-x-hidden sm:grid  sm:grid-cols-[1fr_auto] sm:gap-2'>
              {getFlagEmoji(countrycode)}
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
          />
          {state.isPlaying ? (
            <HiPause className='fill-CustomActivePurple' />
          ) : (
            <HiPlay className='fill-CustomActivePurple  stroke-CustomActivePurple' />
          )}
          <span className='inline-block text-sm'>{audioStatus.message}</span>
        </button>
        <div className='hidden  sm:grid grid-cols-[repeat(2,auto)] items-center justify-center gap-2'>
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
