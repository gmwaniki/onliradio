import { useStationState } from '../../Context/AudioContext';
import { TStation } from '../../util/playableStation';
import StationCard from './StationCard';

const StationSection = ({
  stations,
  title,
}: {
  stations: TStation[];
  title: string;
}) => {
  const { state } = useStationState();

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
        <h1 className='font-semibold text-lg break-words'>{title}</h1>
      </div>
      <div className=' flex overflow-x-scroll scroll-smooth snap-x snap-mandatory [&>*+*]:ml-[.85rem] scrollbar sm:px-2 pt-2 md:snap-none '>
        {stations.map((station) => {
          return (
            <StationCard
              station={station}
              key={station.stationuuid}
              isPlaying={isplaying(station)}
            />
          );
        })}
      </div>
    </section>
  );
};
export default StationSection;
