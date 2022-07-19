import Link from 'next/link';
import React, { ReactElement, useContext } from 'react';
import {
  HiExternalLink,
  HiMusicNote,
  HiOutlineMusicNote,
  HiOutlinePlay,
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
  isPlaying,
}: {
  station: TStation;
  className?: string;
  isPlaying?: boolean;
  refCallback: (el: HTMLImageElement) => void;
}): JSX.Element => {
  const { homepage, name, favicon, language, countrycode, country } = station;
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
              <HiExternalLink
                className='text-3xl hover:fill-CustomActivePurple'
                aria-hidden='true'
              />
            </a>
          </Link>

          <button
            onClick={() => {
              dispatch({
                type: StationReducerActionType.PLAY,
                payload: station,
              });
            }}
          >
            <span className='sr-only'>Play station</span>

            <HiOutlinePlay className='[&_path]:stroke-1  text-6xl mt-1 hover:stroke-CustomActivePurple ' />
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
            className='text-ellipsis overflow-hidden whitespace-nowrap block capitalize'
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
          className='text-2xl col-start-3 justify-self-center self-center'
          title={country}
        >
          {getFlagEmoji(countrycode)}
        </div>
      </div>
    </section>
  );
};

export default React.memo(StationCard);
