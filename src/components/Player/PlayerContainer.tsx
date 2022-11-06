import { useContext } from 'react';
import { StationContext } from '../../Context/AudioContext';

import Player from './Player';

const PlayerContainer = () => {
  const { state } = useContext(StationContext);
  const { station } = state;

  if (!station.stationId) {
    return <></>;
  }
  return <Player state={station} isPlaying={state.isPlaying} />;
};

export default PlayerContainer;
