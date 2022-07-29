import { useCallback, useRef } from 'react';
import { useStationState } from '../../Context/AudioContext';
import useInterSectionObserver from '../../hooks/useIntersectionObserver';
import { TStation } from '../../util/playableStation';
import StationCard from './StationCard';

const StationSection = ({
  stations,
}: {
  stations: TStation[];
  title: string;
}) => {
  const { state } = useStationState();
  const ref = useRef<HTMLImageElement[]>([]);
  useInterSectionObserver(ref);
  const setImageElementRef = useCallback((el: HTMLImageElement) => {
    if (ref.current) {
      if (!el) return;
      ref.current.push(el);
    }
  }, []);
  const isplaying = (station: TStation) => {
    if (state === null || state.isPlaying === undefined) return null;
    if (state.stationuuid !== station.stationuuid) {
      return null;
    }
    return state.isPlaying;
  };

  return (
    <section className='col-start-1 col-span-full overflow-x-auto'>
      <div className=''>
        <h1 className='font-semibold text-lg break-words'>Stations by Votes</h1>
      </div>
      <div className=' flex overflow-x-scroll scroll-smooth snap-x snap-mandatory [&>*+*]:ml-[.85rem] scrollbar sm:px-2 pt-2 md:snap-none '>
        {stations.map((station) => {
          return (
            <StationCard
              station={station}
              key={station.stationuuid}
              refCallback={setImageElementRef}
              isPlaying={isplaying(station)}
            />
          );
        })}
      </div>
    </section>
  );
};
export default StationSection;
