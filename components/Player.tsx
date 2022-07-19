import { useContext, useEffect, useRef } from 'react';
import {
  HiOutlineHeart,
  HiOutlineMusicNote,
  HiOutlinePlay,
  HiPlay,
  HiVolumeUp,
} from 'react-icons/hi';
import {
  stationContext,
  StationReducerActionType,
} from '../Context/AudioContext';
import getFlagEmoji from '../util/getFlagEmoji';

import { TStation } from '../util/playableStation';

const Player = ({ station }: { station?: TStation }) => {
  const { state, dispatch } = useContext(stationContext);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (state && audio && state.isPlaying) {
      audio.play();
    }
    console.log('got called');
    console.log(state);
    console.log(audio);
    return () => {
      if (state && audio) {
        audio.pause();
        audio.load();
      }

      // if (state?.isPlaying) {
      // if (audio) {
      //
      // }
      console.log('removed');
      // }
    };
  }, [state?.isPlaying, state]);
  if (!state) return <div></div>;
  const { country, name, favicon, url_resolved, countrycode } = state;
  return (
    <section className='fixed right-0 left-0 bottom-2  z-10 text-CustomTextGrey  grid place-items-center px-2'>
      <div className='grid grid-cols-[1fr_auto_1fr] justify-between bg-CustomBackgroundBlack container sm:grid-cols-[auto_1fr_auto_auto]  py-2 pl-2 pr-1  gap-6 rounded-md'>
        <div className='grid grid-cols-[auto_auto] items-center gap-1 sm:gap-2'>
          <div className='w-[50px]'>
            {favicon ? (
              <picture className='w-[30%]'>
                <img
                  src={favicon}
                  alt={'woow'}
                  width='100%'
                  //   height='90px'
                  className='object-contain'
                />
              </picture>
            ) : (
              <HiOutlineMusicNote className='w-full h-full svgthin' />
            )}
          </div>
          <div>
            <p className='Capitalize text-ellipsis overflow-hidden whitespace-nowrap'>
              {name}
            </p>
            <div className='hidden sm:block'>
              {country}
              {getFlagEmoji(countrycode)}
            </div>
          </div>
        </div>
        <button
          className='text-5xl self-center justify-self-center'
          onClick={() => {
            if (state) {
              dispatch({
                type: StationReducerActionType.TOGGLE,
                payload: state,
              });
            }
          }}
        >
          <audio src={url_resolved} ref={audioRef} />
          <HiOutlinePlay className='svgthin' />
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
