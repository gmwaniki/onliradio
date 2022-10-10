import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { playableStations, TStation } from '../util/playableStation';

const useGetStations = (url: string): UseQueryResult<TStation[]> => {
  const stations = useQuery([url], async () => await fetchStation(url), {
    staleTime: Infinity,
  });
  return stations;
};
export const fetchStation = async (url: string): Promise<TStation[]> => {
  const { data } = await axios.get<TStation[]>(url);
  return playableStations(data);
};

export default useGetStations;
