import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import {
  HiOutlineHeart,
  HiOutlineInformationCircle,
  HiOutlineMusicNote,
  HiOutlinePlay,
  HiPause,
  HiPlay,
} from 'react-icons/hi';
import {
  stationContext,
  StationReducerActionType,
} from '../../Context/AudioContext';
import getFlagEmoji from '../../util/getFlagEmoji';
import { TStation } from '../../util/playableStation';

const StationHeaderCard = ({
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
  const handlePlayPauseButton = () => {
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
  };

  return (
    <section
      className={`bg-CustomBackgroundBlack grid grid-flow-col p-2 sm:p-5 rounded-md w-full snap-center flex-shrink-0  sm:max-w-full ${className} `}
    >
      <div className='grid grid-cols-3 grid-rows-[auto_200px_auto] sm:grid-rows-[auto_auto_auto] gap-y-6 items-center'>
        <Link href={homepage}>
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
                width='300px'
                height='300px'
                placeholder='blur'
                blurDataURL='/images/placeholder.png'
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
            {isPlaying !== null && isPlaying === false ? (
              <HiPlay className=' mt-1 fill-CustomActivePurple' />
            ) : isPlaying === true ? (
              <HiPause className='mt-1 fill-CustomActivePurple ' />
            ) : (
              <HiOutlinePlay className='svgthin mt-1 hover:stroke-CustomActivePurple ' />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default StationHeaderCard;
