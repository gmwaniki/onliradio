import Link from 'next/link';
import { ReactElement } from 'react';
import { HiExternalLink, HiPlay } from 'react-icons/hi';
import { MdTranslate } from 'react-icons/md';
import { TStation } from '../../util/playableStation';

const StationCard = ({
  station,
  className,
  refCallback,
}: {
  station: TStation;
  className?: string;
  refCallback: (el: HTMLImageElement) => void;
}): JSX.Element => {
  const { homepage, name, favicon, language } = station;

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

          <button>
            <span className='sr-only'>Play station</span>
            <HiPlay className='text-6xl mt-1 hover:fill-CustomActivePurple  bg-clip-border' />
          </button>
        </div>
        <div className='col-span-3 flex justify-center items-center'>
          <picture className='relative w-[35%]  flex justify-center items-center'>
            <img
              data-src={favicon || '/images/logo/profile.png'}
              alt={name}
              width='300px'
              height='300px'
              className='object-contain '
              ref={refCallback}
            />
          </picture>
        </div>
        <div className='mt-4'>
          <h2
            className='text-ellipsis overflow-hidden whitespace-nowrap block'
            title={name}
          >
            {name}
          </h2>
          <div className='flex items-center'>
            <div className='sr-only'>Language</div>
            <MdTranslate aria-hidden='true' />
            <span className='ml-1 capitalize'>{language}</span>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default StationCard;
