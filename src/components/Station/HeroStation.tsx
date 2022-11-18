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
  const tags = useMemo(() => {
    return station.tags.split(',').map((tag, index) => {
      if (tag) {
        if (index < 2) {
          return (
            <li className='bg-CustomBlack rounded-3xl px-2' key={index}>
              {tag}
            </li>
          );
        }
      }

      return;
    });
  }, [station.tags]);

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

      <div
        className='bg-CustomLightBlack text-CustomWhite p-4 grid gap-y-1 grid-rows-[auto,115px,auto] grid-cols-2 rounded  sm:grid-cols-3 sm:auto-rows-auto sm:grid-rows-1 sm:gap-y-4
      '
      >
        <div className='hidden sm:block sm:col-start-1 sm:row-start-1'>
          <ul className='flex gap-x-4 min-h-[24px]'>{tags}</ul>
        </div>
        <p className='flex items-center gap-x-2 justify-self-end col-start-2 sm:col-start-1 sm:row-start-3 sm:justify-self-start'>
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
          className='justify-self-center self-center rounded col-span-2 row-start-2 col-start-1 object-cover sm:row-span-4 sm:col-auto'
        />
        <div className='grid grid-cols-[minmax(0,.8fr),minmax(0,.2fr)] col-start-1 row-start-3 items-center sm:col-start-1 sm:row-start-2 sm:grid-cols-1 sm:grid-rows-[min-content]'>
          <p className='flex flex-col '>
            <span className='uppercase whitespace-nowrap overflow-hidden text-ellipsis sm:text-2xl '>
              {station.name}
            </span>
            <span className='sm:flex sm:flex-col'>
              <span className='sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis sm:min-h-[1.5rem]'>
                {station.country}
              </span>
              {getFlagEmoji(station.countrycode) || '🤷'}
            </span>
          </p>
        </div>
        <button
          type='button'
          aria-label={`Play ${station.name}`}
          className='justify-self-end col-start-2 row-start-3 sm:row-span-4 sm:col-auto '
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
            <HiOutlinePause className='text-[60px] childPath:stroke-1 sm:text-[120px] sm:childPath:stroke-[0.5]' />
          ) : (
            <HiOutlinePlay className='text-[60px] childPath:stroke-1 sm:text-[120px] sm:childPath:stroke-[0.5]' />
          )}
        </button>
      </div>
    </div>
  );
}
