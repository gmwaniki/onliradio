import React, { createContext, ReactNode, useReducer, useState } from 'react';
import { TStation, TstationApp } from '../util/playableStation';

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

type TStorePlayedStationReducer<T> = (
  state: T[],
  action: { type: 'storeStation'; payload: T }
) => T[];

type TstationReducer = (
  state: TStationStatus,
  action: TStationAction
) => TStationStatus;

const storePlayedStationReducer: TStorePlayedStationReducer<string> = (
  state,
  action
) => {
  switch (action.type) {
    case 'storeStation': {
      const playedStations = localStorage.getItem('playedStations');
      if (playedStations !== null) {
        const stationsNoDuplicate = new Set<string>(JSON.parse(playedStations));
        if (stationsNoDuplicate.has(action.payload)) {
          stationsNoDuplicate.delete(action.payload);
          stationsNoDuplicate.add(action.payload);
        } else {
          stationsNoDuplicate.add(action.payload);
        }
        localStorage.setItem(
          'playedStations',
          JSON.stringify([...stationsNoDuplicate])
        );
        return JSON.parse(localStorage.getItem('playedStations')!!) as string[];
      }
      localStorage.setItem('playedStations', JSON.stringify([action.payload]));
      return JSON.parse(localStorage.getItem('playedStations')!!) as string[];
    }
    default: {
      return state;
    }
  }
};

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
      console.log('toggled');
      return { ...state, isPlaying: !state.isPlaying };
    }
    default: {
      return state;
    }
  }
};
export const StationContext = createContext<{
  dispatch: React.Dispatch<TStationAction>;
  state: TStationStatus;
  storedStations: string[];
  dispatchStoreStation: React.Dispatch<{
    type: 'storeStation';
    payload: string;
  }>;
  url: string;
  changeUrl: (url: string) => void;
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
  storedStations: [],
  dispatchStoreStation: () => {},
  changeUrl: () => {},
  url: '',
});

const StationContextProvider = ({ children }: { children: ReactNode }) => {
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
  const [storedStations, dispatchStoreStation] = useReducer(
    storePlayedStationReducer,
    [],
    () => {
      const playedStations = localStorage.getItem('playedStations');
      if (
        playedStations === null ||
        !Array.isArray(JSON.parse(playedStations))
      ) {
        return [];
      }
      return JSON.parse(playedStations) as string[];
    }
  );
  const [url, setUrl] = useState('');
  const changeUrl = (url: string) => {
    setUrl(url);
  };
  return (
    <StationContext.Provider
      value={{
        dispatch,
        state,
        dispatchStoreStation,
        storedStations,
        url,
        changeUrl,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};

export default StationContextProvider;
