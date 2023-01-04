import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

import { requestImage } from '../../../util/getImage';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { url } = req.query;

  if (!url || Array.isArray(url)) {
    res.status(400);
    res.end();
    return;
  }

  try {
    const imageUrl = new URL(url);
    const imageResponse = await requestImage(imageUrl);
    const imageType = imageResponse.headers['content-type'];

    const imageSize = imageResponse.headers['content-length'];

    if (!imageType) {
      return res.status(500);
    }
    if (!imageType.includes('image')) {
      return res.status(400);
    }

    if (imageSize && parseInt(imageSize) <= 1000) {
      res.setHeader('Content-Type', imageType);
      return imageResponse.pipe(res);
    }

    const smallerimage = sharp()
      .resize(100, 100, {
        fit: 'outside',
        width: 100,
        height: 100,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ quality: 5, compressionLevel: 9 });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'max-age=31536000, immutable');

    return imageResponse
      .pipe(smallerimage)
      .on('error', (error) => {
        console.log(error);
        res.status(400);
        res.end();
      })
      .pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }

  //   res.status(200).json({ name: 'John Doe' });
}
