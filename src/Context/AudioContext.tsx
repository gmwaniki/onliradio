import React, { createContext, ReactNode, useReducer } from 'react';
import { TStation, TstationApp } from '../util/playableStation';

type TstationReducer<T extends TStation> = (
  state: T,
  action: { type: StationReducerActionType; payload: T }
) => any;

export enum StationReducerActionType {
  PLAY = 'play',
  PAUSE = 'pause',
  TOGGLE = 'TOGGLE',
}
const stationReducer: TstationReducer<TstationApp> = (state, action) => {
  switch (action.type) {
    case StationReducerActionType.PLAY: {
      return { ...state, ...action.payload, isPlaying: true };
    }
    case StationReducerActionType.PAUSE: {
      return { ...state, isPlaying: false };
    }
    case StationReducerActionType.TOGGLE: {
      return { ...state, isPlaying: !state.isPlaying };
    }
    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
};
export const stationContext = createContext<{
  dispatch: React.Dispatch<{
    type: StationReducerActionType;
    payload: TStation | TstationApp;
  }>;
}>({ dispatch: () => {} });
const StationStateContext = createContext<{ state: null | TstationApp }>({
  state: null,
});

const StationContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(stationReducer, null);

  return (
    <stationContext.Provider value={{ dispatch }}>
      <StationStateContext.Provider value={{ state }}>
        {children}
      </StationStateContext.Provider>
    </stationContext.Provider>
  );
};
export const useStationState = () => {
  return React.useContext(StationStateContext);
};

export default StationContextProvider;
