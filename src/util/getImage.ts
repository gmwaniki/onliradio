// import { IncomingMessage, request } from 'node:http';
// import { request as requestHttps } from 'node:https';
import type { URL } from 'node:url';
import { http, https } from 'follow-redirects';
import { IncomingMessage } from 'node:http';
const { request } = http;
const { request: requestHttps } = https;

export const requestImage = (imageUrl: URL): Promise<IncomingMessage> => {
  return new Promise((resolve, reject) => {
    if (imageUrl.protocol === 'http:') {
      const imageRequest = request(imageUrl, {}, (res) => {
        resolve(res);
      });

      imageRequest.on('error', (error) => {
        console.error(error);
        reject('error');
      });

      imageRequest.end();
    } else if (imageUrl.protocol === 'https:') {
      const imageRequest = requestHttps(imageUrl, { method: 'GET' }, (res) => {
        resolve(res);
      });

      imageRequest.on('error', (error) => {
        console.error(error);
        reject('error');
      });

      imageRequest.end();
    } else {
      reject('error');
    }
  });
};
