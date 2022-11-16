'use client';
import Image from 'next/image';
import { useContext, useMemo, useState } from 'react';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePause,
  HiOutlinePlay,
  HiOutlineStar,
} from 'react-icons/hi';
import { AudioContext, StationReducerActionType } from '../../app/AudioContext';
import getFlagEmoji from '../../util/getFlagEmoji';
import { TStation } from '../../util/playableStation';

type TProps = {
  stations: TStation[];
};
export default function HeroStation({ stations }: TProps) {
  const [index, setIndex] = useState(0);
  const { dispatch, state } = useContext(AudioContext);
  const isCurrentStation = useMemo((): boolean => {
    if (state.station.stationId === stations[index].stationuuid) {
      return state.isPlaying;
    } else {
      return false;
    }
  }, [state.station.stationId, index, stations, state.isPlaying]);

  const incrementIndex = () => {
    let nextStation = stations[index + 1];
    if (nextStation === undefined) {
      setIndex(0);
      return;
    }

    setIndex((index) => index + 1);
  };
  const decrementIndex = () => {
    let nextStation = stations[index - 1];
    if (nextStation === undefined) {
      setIndex(stations.length - 1);
      return;
    }

    setIndex((index) => index - 1);
  };
  const station = stations[index];
  return (
    <div className='text-CustomWhite '>
      <div className='flex justify-between items-center'>
        <p className='font-medium text-lg'>Top voted Stations</p>
        <span className='flex items-center '>
          <button
            type='button'
            aria-label='Previous'
            className='p-2 group'
            onClick={decrementIndex}
          >
            <HiOutlineChevronLeft className='text-3xl  group-active:opacity-50' />
          </button>
          <span className='text-CustomActive font-bold text-xl'>
            {index + 1}
          </span>
          <button
            type='button'
            aria-label='Previous'
            className='p-2 group'
            onClick={incrementIndex}
          >
            <HiOutlineChevronRight className='text-3xl group-active:opacity-50' />
          </button>
        </span>
      </div>
      <div>
        <div className='bg-CustomLightBlack text-CustomWhite p-4 grid gap-y-1 grid-rows-[auto,115px,auto] rounded '>
          <p className='flex items-center gap-x-2 justify-self-end'>
            <HiOutlineStar className='text-2xl' />
            <span className='text-xl'>{station.votes}</span>
          </p>
          <Image
            src={
              station.favicon
                ? `/api/image?url=${station.favicon}`
                : '/musicnote.svg'
            }
            alt={station.name}
            width={115}
            height={115}
            onError={(e) => {
              e.currentTarget.src = '/musicnote.svg';
            }}
            priority
            className='justify-self-center self-center rounded object-cover'
          />
          <div className='grid grid-cols-[minmax(0,.8fr),minmax(0,.2fr)] items-center'>
            <p className='flex flex-col '>
              <span className='uppercase whitespace-nowrap overflow-hidden text-ellipsis'>
                {station.name}
              </span>
              <span>
                {station.country} {getFlagEmoji(station.countrycode) || '🤷'}
              </span>
            </p>
            <button
              type='button'
              aria-label={`Play ${station.name}`}
              className='justify-self-center sm:justify-self-end'
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
                <HiOutlinePause className='text-[60px] childPath:stroke-1' />
              ) : (
                <HiOutlinePlay className='text-[60px] childPath:stroke-1' />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
