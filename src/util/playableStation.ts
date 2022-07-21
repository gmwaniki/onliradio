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
export type TstationApp = TStation & { isPlaying?: boolean };
type TplayableStations<T = TStation> = (stations: Array<T>) => Array<T>;

export const playableStations: TplayableStations = function (stations) {
  const stationsNoHls = stations
    .filter((station) => {
      return station.hls === 0;
    })
    .map((station) => {
      if (station.favicon) {
        station.favicon = sethttps(station.favicon);
      }

      return station;
    });
  return stationsNoHls;
};

const sethttps = (url: string): string => {
  try {
    const urlObject = new URL(url);
    if (urlObject.protocol !== 'https:') {
      urlObject.protocol = 'https:';
      url = urlObject.toString();
    }
  } catch (error) {
    url = '';
  }
  return url;
};
