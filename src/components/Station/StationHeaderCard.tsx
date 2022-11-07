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
import {
  StationContext,
  StationReducerActionType,
} from '../../Context/AudioContext';
import getFlagEmoji from '../../util/getFlagEmoji';
import { TStation } from '../../util/playableStation';
import { shimmer, toBase64 } from '../../util/shimmer';

const StationHeaderCard = ({
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
  const { dispatch, state } = useContext(StationContext);
  const handlePlayPauseButton = () => {
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
  };

  return (
    <section
      className={`bg-CustomBackgroundBlack grid grid-flow-col p-2 sm:p-5 rounded-md w-full snap-center flex-shrink-0  sm:max-w-full ${className} `}
    >
      <div className='grid grid-cols-3 grid-rows-[auto_200px_auto] sm:grid-rows-[auto_auto_auto] gap-y-6 items-center'>
        <Link href={homepage} prefetch={false}>
          <a target='_blank' rel='nofollow noreferrer'>
            <span className='sr-only'>Go to radio station website</span>
            <HiOutlineInformationCircle
              className='text-3xl hover:stroke-CustomActivePurple sm:text-4xl'
              aria-hidden='true'
            />
          </a>
        </Link>
        <div className=' row-start-2 row-end-3 col-span-3 '>
          <div className='flex relative w-[40%] sm:w-[25%] max-w-[200px] 2xl:max-w-[640px]  mx-auto'>
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
              />
            ) : (
              <HiOutlineMusicNote className='w-[300px] h-full svgthin' />
            )}
          </div>
        </div>
        <div className=' col-start-3 text-xl justify-self-center self-end grid grid-rows-[auto_auto]  sm:self-center sm:justify-self-end'>
          <div className='grid grid-cols-[auto_auto] gap-1 items-center'>
            <HiOutlineHeart className=' sm:text-3xl' />
            <span className='text-base sm:text-xl'>{votes}</span>
          </div>
        </div>

        <div className=' row-end-4 col-start-1 col-span-2'>
          <h2
            className='text-ellipsis  overflow-hidden whitespace-nowrap uppercase sm:text-xl'
            title={name}
          >
            {name}
          </h2>
          <div className='sm:text-xl'>
            {getFlagEmoji(countrycode) || '🤷'}
            <span className='capitalize'> {language}</span>
          </div>
        </div>
        <div className='justify-self-end col-start-3 row-end-4'>
          <button
            onClick={handlePlayPauseButton}
            className='text-6xl sm:text-7xl'
          >
            <span className='sr-only'>Play station</span>
            {isPlaying === false ? (
              <HiOutlinePlay className='svgthin mt-1 hover:stroke-CustomActivePurple ' />
            ) : (
              <HiPause className='mt-1 fill-CustomActivePurple ' />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(StationHeaderCard);
