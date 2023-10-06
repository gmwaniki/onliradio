import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(
  req: NextApiRequest
  //   _res: NextApiResponse
) {
  //   const { audiolink } = req.query;

  const url = new URL(req.url ?? '');

  const audiolink = url.searchParams.get('audiolink');
  console.log(audiolink);
  try {
    if (!audiolink || Array.isArray(audiolink)) {
      throw new Error('Invalid url');
      // return;
    }
    const audioUrl = new URL(audiolink);
    const audioResponse = await fetch(audioUrl);
    if (audioResponse.status === 200) {
      const response = new NextResponse(audioResponse.body, { status: 200 });
      response.headers.set('Content-Type', 'application/vnd.apple.mpegurl');

      return response;
    }
    return new NextResponse(null, { status: 400 });
    // const body = await audioResponse.text();
    // console.log(body, audioResponse.headers);
    // if (!audioResponse.body) {
    //   throw new Error('Invalid body');
    // }
    // // const response = new NextResponse(audioResponse.body);
    // console.log(audioResponse.headers.get('Content-type'));
    // console.log('got called again');
    // // res.setHeader(
    // //   'Content-Type',
    // //   audioResponse.headers.get('Content-type') ?? 'audio/mpeg'
    // // );
    // // const body = await audioResponse.body
    // res.setHeader('Content-Type', 'application/octet-stream');
    // // res.end();
    // // audioResponse.body.pipeThrough(res)
    // res.end();
    // return;
    // return response;
  } catch (error) {
    console.log(error);
    return;
  }
}

export const runtime = 'edge';
