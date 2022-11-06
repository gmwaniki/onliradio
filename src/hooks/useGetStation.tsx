import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { StationContext } from '../Context/AudioContext';
import { TStation } from '../util/playableStation';
import useGetStations from './useGetStations';

export default function useGetStation(id: string): UseQueryResult<TStation> {
  const { url: globalUrl } = useContext(StationContext);
  const url = `${globalUrl}/stations/byuuid/${id}`;
  return useQuery(
    [url],
    async () => {
      const result = await axios.get<TStation[]>(url);
      return result.data[0];
    },
    { staleTime: Infinity, enabled: Boolean(id), cacheTime: 0 }
  );
}
