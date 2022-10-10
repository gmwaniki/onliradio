import React, {
  createContext,
  ReactNode,
  useCallback,
  useReducer,
} from 'react';
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
      const addStationToStorage = () => {
        const recentlyPlayedStationsString = localStorage.getItem(
          'recentlyPlayedStations'
        );
        const currentTime = new Date().getTime();
        const stationsFromStorage: { id: string; date: number }[] | null =
          recentlyPlayedStationsString
            ? JSON.parse(recentlyPlayedStationsString)
            : null;
        const recetlyPlayedStation = {
          id: action.payload.stationuuid,
          date: currentTime,
        };
        if (!Array.isArray(stationsFromStorage)) {
          localStorage.setItem(
            'recentlyPlayedStations',
            JSON.stringify([recetlyPlayedStation])
          );
        } else {
          //  Check if there is station with similar id
          // if true update array and
          const isStationInStorage = stationsFromStorage.some((station)=>{
            if (station.id ===recetlyPlayedStation.id ) {
              return true;
            }
            return false
          })
          if (isStationInStorage) {
            
          }
          const newStations = stationsFromStorage
            .map((station) => {
              if (station.id === action.payload.stationuuid) {
                return { ...station, date: currentTime };
              }
              return station;
            })
            .sort((recentStation, nextStation) => {
              return recentStation.date - nextStation.date;
            });
          localStorage.removeItem('recentlyPlayedStations');
          console.log(newStations);
          localStorage.setItem(
            'recentlyPlayedStations',
            JSON.stringify(newStations)
          );
        }
      };
      addStationToStorage()

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
  const dispatchCallback = useCallback<typeof dispatch>((arg) => {
    dispatch({ ...arg });
  }, []);

  return (
    <stationContext.Provider value={{ dispatch: dispatchCallback }}>
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
