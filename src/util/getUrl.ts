import { resolveSrv } from 'dns/promises';

export const getUrl = async () => {
  const results = await resolveSrv('_api._tcp.radio-browser.info');
  return `https://${results[0].name}/json`;
};
