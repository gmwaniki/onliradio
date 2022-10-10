import { useEffect } from 'react';
import useGetStations, { fetchStation } from '../../hooks/useGetStations';
import StationSection from './StationSection';

type LocalStationProps = {
  url: string;
  country: string;
};

const LocalStation = ({ country, url }: LocalStationProps) => {
  //   return <StationSection stations={data} title='Top Stations in your Area' />;
  const localStationsurl = `${url}/stations/search?limit=10&order=votes&reverse=true&is_https=true&hidebroken=true&countrycode=${country}`;
  const { data, isError } = useGetStations(localStationsurl);
  if (data === undefined || isError) {
    return <div></div>;
  }

  return <StationSection stations={data} title='Top Stations in your Area' />;
};

export default LocalStation;

/* 
- Receive the location and url prop
- Make a request using rquery for the stations;
- Render Stations in a list
*/
