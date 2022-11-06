import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  HiOutlineMusicNote,
  HiOutlinePlay,
  HiPause,
  HiPlay,
} from 'react-icons/hi';
import { StationContext } from '../../Context/AudioContext';
import { TStation } from '../../util/playableStation';
import { shimmer, toBase64 } from '../../util/shimmer';

type TProps = {
  url: string;
};

type TRecentStation = {
  station: TStation;
  isPlaying: boolean;
};
const RecentStation = ({ station, isPlaying }: TRecentStation) => {
  const [src, setSrc] = useState(`/api/image?url=${station.favicon}`);

  return (
    <div className='grid grid-cols-[.3fr,1fr,auto] gap-2 items-center'>
      <span>
        {station.favicon ? (
          <Image
            src={src}
            alt={station.name}
            width='100'
            height='100'
            placeholder='blur'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(100, 100)
            )}`}
            onError={() => setSrc('/images/musicnote.svg')}
            className='rounded-md'
          />
        ) : (
          <HiOutlineMusicNote className='w-full h-full svgthin' />
        )}
      </span>
      <div className='text-left'>
        <p className=''>{station.name}</p>
        <p>{station.votes}</p>
      </div>
      <button>
        {isPlaying === false ? (
          <HiOutlinePlay className='svgthin  text-6xl mt-1 hover:stroke-CustomActivePurple ' />
        ) : (
          <HiPause className=' text-6xl mt-1 fill-CustomActivePurple ' />
        )}
      </button>
    </div>
  );
};

const StationsPlayed = ({ url }: TProps) => {
  const [stations, setStations] = useState<TStation[]>([]);
  const { storedStations } = useContext(StationContext);
  const { state } = useContext(StationContext);
  const { isPlaying, station: currentStation } = state;

  useEffect(() => {
    const getStations = async () => {
      const params = new URLSearchParams({
        uuids: storedStations.join(','),
      });
      const { href: stationUrl } = new URL(
        `${url}/stations/byuuid?${params.toString()}`
      );
      const { data } = await axios.get(stationUrl);
      setStations(data as TStation[]);
    };
    getStations();
  }, [storedStations, url]);

  return (
    <div className=''>
      {stations.map((station) => {
        return (
          <RecentStation
            station={station}
            key={station.stationuuid}
            isPlaying={
              station.stationuuid === currentStation.stationId && isPlaying
            }
          />
        );
      })}
    </div>
  );
};

export default StationsPlayed;
