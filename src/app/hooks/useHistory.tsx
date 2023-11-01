import { useContext, useEffect, useState } from 'react';

import { AudioContext } from '../providers/AudioContext';

const useHistory = () => {
  const [historyStation, setHistoryStations] = useState<Record<string, string>>(
    {}
  );
  const { state } = useContext(AudioContext);

  useEffect(() => {
    const historyStations = localStorage.getItem('history') as string | null;
    if (!historyStations) {
      setHistoryStations({});
    } else {
      setHistoryStations(JSON.parse(historyStations) as Record<string, string>);
    }
  }, []);

  useEffect(() => {
    if (state.station.stationId) {
      setHistoryStations((prev) => {
        return { ...prev, [state.station.stationId]: '1' };
      });
    }
  }, [state]);
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(historyStation));
  });

  return { historyStation };
};

export default useHistory;
