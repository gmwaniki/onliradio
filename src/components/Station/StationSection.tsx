import { useContext } from 'react';
import { StationContext } from '../../Context/AudioContext';
import { TStation } from '../../util/playableStation';
import StationCard from './StationCard';

const StationSection = ({
  stations,
  title,
}: {
  stations: TStation[];
  title: string;
}) => {
  const { state } = useContext(StationContext);
  const { isPlaying, station: currentStation } = state;

  return (
    <section className='col-start-1 col-span-full overflow-x-auto '>
      <div className=''>
        <h1 className='font-semibold text-lg sm:text-2xl  break-words tracking-wide'>
          {title}
        </h1>
      </div>
      <div className=' flex overflow-x-scroll scroll-smooth snap-x snap-mandatory [&>*+*]:ml-[.85rem] scrollbar sm:px-2 pt-2 md:snap-none '>
        {stations.map((station) => {
          return (
            <StationCard
              station={station}
              key={station.stationuuid}
              isPlaying={
                station.stationuuid === currentStation.stationId && isPlaying
              }
            />
          );
        })}
      </div>
    </section>
  );
};
export default StationSection;
