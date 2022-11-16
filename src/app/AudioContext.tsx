'use client';

import React, { createContext, useReducer } from 'react';

export const AudioContext = createContext<{
  dispatch: React.Dispatch<TStationAction>;
  state: TStationStatus;
}>({
  dispatch: () => {},
  state: {
    station: {
      countryCode: '',
      name: '',
      stationId: '',
      stationurl: '',
      votes: 0,
      favicon: '',
    },
    isPlaying: false,
  },
});

export type TActiveStation = {
  stationId: string;
  stationurl: string;
  name: string;
  votes: number;
  countryCode: string;
  favicon: string;
};

export type TStationStatus = {
  station: TActiveStation;
  isPlaying: boolean;
};
export type TStationAction =
  | {
      type: StationReducerActionType.PLAY;
      payload: TActiveStation;
    }
  | {
      type: StationReducerActionType.PAUSE;
    }
  | {
      type: StationReducerActionType.TOGGLE;
    };

export enum StationReducerActionType {
  PLAY = 'play',
  PAUSE = 'pause',
  TOGGLE = 'TOGGLE',
}

type TstationReducer = (
  state: TStationStatus,
  action: TStationAction
) => TStationStatus;

const stationReducer: TstationReducer = (state, action) => {
  switch (action.type) {
    case StationReducerActionType.PLAY: {
      const {} = action.payload;
      return { isPlaying: true, station: { ...action.payload } };
    }
    case StationReducerActionType.PAUSE: {
      return { ...state, isPlaying: false };
    }
    case StationReducerActionType.TOGGLE: {
      return { ...state, isPlaying: !state.isPlaying };
    }
    default: {
      return state;
    }
  }
};

export default function AudioContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(stationReducer, {
    isPlaying: false,
    station: {
      countryCode: '',
      name: '',
      stationId: '',
      stationurl: '',
      votes: 0,
      favicon: '',
    },
  });
  return (
    <AudioContext.Provider value={{ state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
}