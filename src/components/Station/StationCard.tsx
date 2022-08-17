import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
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
import { shimmer, toBase64 } from '../../util/shimmer';

const StationCard = ({
  station,
  className,
  isPlaying = null,
}: {
  station: TStation;
  className?: string;
  isPlaying: boolean | null;
}): JSX.Element => {
  const { homepage, name, favicon, language, countrycode, country, votes } =
    station;
  const [src, setSrc] = useState(`/api/image?url=${favicon}`);
  const { dispatch } = useContext(stationContext);

  return (
    <section
      className={`bg-CustomBackgroundBlack grid grid-flow-col p-2 rounded-md ${className} flex-shrink-0 snap-center transition-all ${
        isPlaying && 'shadow-active -translate-y-2 '
      }`}
    >
      <div className='grid grid-cols-[repeat(3,100px)] grid-rows-[64px_125px_52px] gap-y-2'>
        <div className='col-start-1 col-end-4 flex justify-between items-center'>
          <Link href={homepage}>
            <a target='_blank' rel='nofollow noreferrer'>
              <span className='sr-only'>Go to radio station website</span>
              <HiOutlineInformationCircle
                className='text-3xl hover:stroke-CustomActivePurple '
                aria-hidden='true'
              />
            </a>
          </Link>

          <button
            onClick={() => {
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
            onKeyDown={(e) => {
              if (e.code === 'Space' && isPlaying !== undefined) {
                e.preventDefault();
              }
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
        <div className='col-span-3 flex justify-center items-center relative w-[35%]  justify-self-center'>
          {favicon ? (
            <Image
              src={src}
              alt={name}
              width='300px'
              height='300px'
              placeholder='blur'
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(300, 300)
              )}`}
              onError={() => setSrc('/images/musicnote.svg')}
            />
          ) : (
            <HiOutlineMusicNote className='w-full h-full svgthin' />
          )}
        </div>
        <div className='col-span-2 '>
          <p
            className='text-ellipsis overflow-hidden whitespace-nowrap capitalize w-[90%] mr-auto '
            title={name}
          >
            {name}
          </p>
          <div className='grid grid-cols-[auto_1fr] items-center'>
            <div className='sr-only'>Language</div>
            <MdTranslate aria-hidden='true' className='' />
            <span
              className='ml-1 capitalize text-ellipsis overflow-hidden whitespace-nowrap'
              title={language}
            >
              {language}
            </span>
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
