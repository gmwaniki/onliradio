import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { playableStations, TStation } from '../util/playableStation';

const useGetStations = (url: string): UseQueryResult<TStation[]> => {
  const stations = useQuery([url], () => fetchStation(url), {
    staleTime: 60000,
  });
  return stations;
};
const fetchStation = async (url: string): Promise<TStation[]> => {
  const { data } = await axios.get(url);
  return playableStations(data);
};
export default useGetStations;
