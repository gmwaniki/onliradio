import React, { useEffect, useState } from 'react';
import { TStation } from '../../util/playableStation';

const StationsPlayed = () => {
  const [stationsPlayed, setStationsPlayed] = useState<TStation[] | null>(null);

  useEffect(() => {
    console.log(localStorage.getItem('recentlyPlayedStations'));
  }, []);
  return <div>StationsPlayed</div>;
};

export default StationsPlayed;
