import Image from "next/image";
import React, { useContext, useMemo } from "react";
import { HiOutlinePause, HiOutlinePlay, HiOutlineStar } from "react-icons/hi";

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
    <div className="bg-CustomLightBlack p-4 sm:p-8 w-full rounded-sm  flex flex-col gap-2 ">
      <ul className="flex gap-4 items-start justify-start">
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
    </div>
  );
};

export default HeroStation;
