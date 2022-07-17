import { lookup, reverse } from 'dns/promises';

export async function getRadioServerUrl(): Promise<string> {
  const ipLookup = await lookup('all.api.radio-browser.info', {
    all: true,
    family: 4,
  }).catch((error) => {
    console.log(error);
    throw new Error('Error looking up Dns');
  });
  const urlsfromip = ipLookup.map(async ({ address }) => {
    try {
      const result = await reverse(address);
      return result.toString();
    } catch (error) {
      throw Error('Dns Reverse failed');
    }
  });
  const response = await Promise.all(urlsfromip);
  const requestAddress = Math.floor(Math.random() * response.length);
  return `https://${response[requestAddress]}`;
}
