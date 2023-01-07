'use client';
import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import { HiOutlinePause, HiOutlinePlay } from 'react-icons/hi';

import {
  AudioContext,
  StationReducerActionType,
} from '../../app/providers/AudioContext';
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

  return (
    <div
      className=' w-full h-full bg-CustomLightBlack grid gap-y-2 py-2 rounded group '
      data-playing={isCurrentStation && state.isPlaying}
    >
      <p className='justify-self-center text-center whitespace-nowrap w-10/12 overflow-hidden text-ellipsis'>
        {station.name}
      </p>
      <div className='justify-self-center relative'>
        <Image
          src={
            station.favicon
              ? `/api/image?url=${encodeURIComponent(station.favicon)}`
              : '/musicnote.svg'
          }
          alt={'musicnote'}
          width={70}
          height={70}
          quality={50}
          onError={(e) => {
            e.currentTarget.src = '/musicnote.svg';
          }}
          className='object-contain min-w-[70px] min-h-[70px] rounded'
        />
        <span className='absolute w-6 h-6 text-center  -top-1 -right-1 bg-CustomLightBlack  rounded-full  ring-1 ring-CustomActive'>
          {getFlagEmoji(station.countrycode) || '🤷'}
        </span>
      </div>
      <button
        type='button'
        className=' text-lg flex w-5/6 justify-self-center items-center justify-center border-2 border-CustomActive  py-1 px-3 rounded gap-x-2 transition-colors duration-300 group-hover:transition-colors group-hover:duration-300 group-hover:bg-CustomActive group-data-[playing=true]:text-CustomActive group-data-[playing=true]:bg-CustomBlack group-data-[playing=true]:shadow-[0_0_10px_0px_#A852FF,0_1px_1px_0px_#A852FF,1px_0_1px_0px_#A852FF]'
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
  );
}
