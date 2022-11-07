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
  StationContext,
  StationReducerActionType,
} from '../../Context/AudioContext';
import getFlagEmoji from '../../util/getFlagEmoji';
import { TStation } from '../../util/playableStation';
import { shimmer, toBase64 } from '../../util/shimmer';

const StationCard = ({
  station,
  className,
  isPlaying,
}: {
  station: TStation;
  className?: string;
  isPlaying: boolean;
}): JSX.Element => {
  const { homepage, name, favicon, language, countrycode, country, votes } =
    station;
  const [src, setSrc] = useState(`/api/image?url=${favicon}`);
  const { dispatch } = useContext(StationContext);

  return (
    <section
      className={`bg-CustomBackgroundBlack grid grid-flow-col p-2 rounded-md ${className} flex-shrink-0 snap-center transition-all min-w-[300px] mr-2 ${
        isPlaying && 'shadow-active -translate-y-2 '
      }`}
    >
      <div className='grid grid-cols-[repeat(3,100px)] grid-rows-[64px_125px_52px] gap-y-2'>
        <div className='col-start-1 col-end-4 flex justify-between items-center'>
          <Link href={homepage} prefetch={false}>
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
              if (isPlaying === false) {
                dispatch({
                  type: StationReducerActionType.PLAY,
                  payload: {
                    countryCode: station.countrycode,
                    name: station.name,
                    stationId: station.stationuuid,
                    stationurl: station.url_resolved,
                    votes: station.votes,
                    favicon: station.favicon,
                  },
                });
                return;
              }
              dispatch({
                type: StationReducerActionType.TOGGLE,
              });
              return;
            }}
            // onKeyDown={(e) => {
            //   if (e.code === 'Space' && isPlaying !== undefined) {
            //     e.preventDefault();
            //   }
            // }}
          >
            <span className='sr-only'>Play station</span>
            {isPlaying === false ? (
              <HiOutlinePlay className='svgthin  text-6xl mt-1 hover:stroke-CustomActivePurple ' />
            ) : (
              <HiPause className=' text-6xl mt-1 fill-CustomActivePurple ' />
            )}
          </button>
        </div>
        <div className='col-span-3 flex justify-center items-center relative w-[35%]  justify-self-center'>
          {favicon ? (
            <Image
              src={src}
              alt={name}
              width={300}
              height={300}
              placeholder='blur'
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(300, 300)
              )}`}
              onError={() => setSrc('/images/musicnote.svg')}
              className='rounded-md'
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
