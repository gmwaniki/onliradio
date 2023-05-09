import { motion } from 'framer-motion';

import {
  AudioContext,
  StationReducerActionType,
} from "../../app/providers/AudioContext";
import { TStation } from "../../util/playableStation";
import Tag from "./Tag";

type HeroStationProps = {
  station: TStation;
};

const HeroStation = ({ station }: HeroStationProps) => {
  const { dispatch, state } = useContext(AudioContext);
  const isCurrentStation = useMemo((): boolean => {
    if (state.station.stationId === station.stationuuid) {
      return state.isPlaying;
    } else {
      return false;
    }
  }, [state.station.stationId, station, state.isPlaying]);
  const tags = useMemo(() => {
    return station.tags.split(",").slice(0, 2);
  }, [station.tags]);

  return (
    <motion.div
      className='bg-CustomLightBlack p-4  h-full w-full rounded-sm   grid grid-flow-row auto-rows-min gap-2 lg:p-8 lg:grid-cols-2 lg:grid-rows-2 gap-x-8'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'spring', duration: 0.25 }}
      exit={{ opacity: 0 }}
      drag='x'
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
    >
        {tags.map((tag, index) => {
          return tag ? (
            <Tag tag={tag} key={index} />
          ) : (
            <Tag tag="music" key={index} />
          );
        })}
      </ul>

      <Image
        src={`/api/image?url=${encodeURIComponent(station.favicon)}`}
        alt={station.name}
        width={130}
        height={130}
        onError={(e) => {
          e.currentTarget.src = "/musicnote.svg";
        }}
        priority
        className="rounded-md aspect-square"
      />

      <div className="flex">
        <div className="w-9/12 sm:text-xl">
          <p className="text-2xl text-ellipsis overflow-hidden whitespace-nowrap">
            {station.name}
          </p>
          <p>
            Language: <span className="capitalize">{station.language}</span>
          </p>
          <span className="flex items-center ">
            <HiOutlineStar />
            {station.votes}
          </span>
        </div>
        <button
          type="button"
          aria-label={`Play ${station.name}`}
          className="w-3/12 aspect-square"
          onClick={() => {
            if (isCurrentStation && state.isPlaying) {
              dispatch({
                type: StationReducerActionType.PAUSE,
              });
              return;
            }
            dispatch({
              type: StationReducerActionType.PLAY,
              payload: {
                countryCode: station.countrycode,
                favicon: station.favicon,
                name: station.name,
                stationId: station.stationuuid,
                stationurl: station.url_resolved,
                votes: station.votes,
                hls: station.hls,
              },
            });
          }}
        >
          {isCurrentStation ? (
            <HiOutlinePause className="w-full h-full aspect-square childPath:stroke-1  sm:childPath:stroke-[0.5]" />
          ) : (
            <HiOutlinePlay className="w-full h-full aspect-square childPath:stroke-1  sm:childPath:stroke-[0.5]  " />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default HeroStation;
