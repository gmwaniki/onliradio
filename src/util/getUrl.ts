import { SrvRecord } from 'node:dns';
import https from 'node:https';

import { resolveSrv } from 'dns/promises';

export const getUrl = async () => {
  const results = await resolveSrv('_api._tcp.radio-browser.info');
  const server = await readyServers(results);

  return server;
};

const readyServers = (servers: SrvRecord[]): Promise<string> => {
  return new Promise((resolve) => {
    for (const server of servers) {
      const serverName = `https://${server.name}/json`;
      https.get(`${serverName}/stats`, (res) => {
        if (res.statusCode === 200) {
          resolve(serverName);
        }
      });
    }
  });
};
