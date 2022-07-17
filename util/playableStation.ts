export type TStation = {
  changeuuid: string;
  stationuuid: string;
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode: string;
  iso_3166_2: string;
  state: string;
  language: string;
  languagecodes: string;
  votes: number;
  lastchangetime: string;
  lastchangetime_iso8601: string;
  codec: string;
  bitrate: number;
  hls: 0 | 1;
  lastcheckok: '0' | '1';
  lastchecktime: string;
  lastchecktime_iso8601: string;
  lastcheckoktime: string;
  lastcheckoktime_iso8601: string;
  lastlocalchecktime: string;
  lastlocalchecktime_iso8601: string;
  clicktimestamp: '';
  clicktimestamp_iso8601: null;
  clickcount: number;
  clicktrend: number;
  ssl_error: number;
  geo_lat: number;
  geo_long: number;
  has_extended_info: boolean;
};
type TplayableStations<T = TStation> = (stations: Array<T>) => Array<T>;

export const playableStations: TplayableStations = function (stations) {
  console.log('The stations');

  // console.log(stations);
  const stationsNoHls = stations
    .filter((station) => {
      return station.hls === 0;
      // console.log(station);
    })
    .map((station) => {
      if (!station.favicon) return station;
      if (station.favicon.startsWith('https')) return station;
      const url = new URL(station.favicon);
      if (url.protocol === 'http:') {
        url.protocol = 'https:';
        station.favicon = url.toString();
        return station;
      } else {
        station.favicon = '';
        return station;
      }
    });
  // console.log(stationsNoHls);
  return stationsNoHls;
};
