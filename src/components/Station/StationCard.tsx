import Link from 'next/link';
import React, { ReactElement, useContext } from 'react';
import {
  HiOutlineHeart,
  HiOutlineInformationCircle,
  HiOutlineMusicNote,
  HiOutlinePlay,
  HiPause,
  HiPlay,
} from 'react-icons/hi';
import { MdTranslate } from 'react-icons/md';
import {
  stationContext,
  StationReducerActionType,
} from '../../Context/AudioContext';
import getFlagEmoji from '../../util/getFlagEmoji';
import { TStation } from '../../util/playableStation';

const StationCard = ({
  station,
  className,
  refCallback,
  isPlaying = null,
}: {
  station: TStation;
  className?: string;
  isPlaying: boolean | null;
  refCallback: (el: HTMLImageElement) => void;
}): JSX.Element => {
  const { homepage, name, favicon, language, countrycode, country, votes } =
    station;
  const { dispatch } = useContext(stationContext);

  return (
    <section
      className={`bg-CustomBackgroundBlack grid grid-flow-col mt-4 pb-4 rounded-md ${className}`}
    >
      <div className='grid grid-cols-3 grid-rows-[auto_1fr_auto] px-2 '>
        <div className='col-start-1 col-end-4 flex justify-between items-center'>
          <Link href={homepage}>
            <a target='_blank'>
              <span className='sr-only'>Go to radio station website</span>
              <HiOutlineInformationCircle
                className='text-3xl hover:stroke-CustomActivePurple '
                aria-hidden='true'
              />
            </a>
          </Link>

          <button
            onClick={() => {
              // if(!state)
              if (isPlaying === null) {
                dispatch({
                  type: StationReducerActionType.PLAY,
                  payload: station,
                });
                return;
              }
              dispatch({
                type: StationReducerActionType.TOGGLE,
                payload: { ...station, isPlaying },
              });
            }}
          >
            <span className='sr-only'>Play station</span>
            {isPlaying !== null && isPlaying === false ? (
              <HiPlay className='text-6xl mt-1 fill-CustomActivePurple' />
            ) : isPlaying === true ? (
              <HiPause className=' text-6xl mt-1 fill-CustomActivePurple ' />
            ) : (
              <HiOutlinePlay className='svgthin  text-6xl mt-1 hover:stroke-CustomActivePurple ' />
            )}
          </button>
        </div>
        <div className='col-span-3 flex justify-center items-center relative w-[35%] mx-auto'>
          {favicon ? (
            <picture>
              <img
                src='/images/musicnote.svg'
                data-src={favicon}
                alt={name}
                width='300px'
                height='300px'
                className='object-contain rounded'
                ref={refCallback}
              />
            </picture>
          ) : (
            <HiOutlineMusicNote className='w-full h-full svgthin' />
          )}
        </div>
        <div className='mt-4 col-span-2'>
          <h2
            className='text-ellipsis overflow-hidden whitespace-nowrap block capitalize mr-4'
            title={name}
          >
            {name.toUpperCase()}
          </h2>
          <div className='flex items-center'>
            <div className='sr-only'>Language</div>
            <MdTranslate aria-hidden='true' />
            <span className='ml-1 capitalize'>{language}</span>
          </div>
        </div>
        <div
          className='text-xl col-start-3 justify-self-center self-end grid grid-rows-[auto_auto]  '
          title={country}
        >
          <div>{getFlagEmoji(countrycode) || '🤷'}</div>
          <div className='grid grid-cols-[auto_auto] gap-1 items-center'>
            <HiOutlineHeart />
            <span className='text-base'>{votes}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(StationCard);
