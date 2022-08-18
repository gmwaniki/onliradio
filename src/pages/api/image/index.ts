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
      res.status(500);
      res.end();
      return;
    }
    if (!imageType.includes('image')) {
      res.status(400);
      res.end();
      return;
    }

    if (imageSize && parseInt(imageSize) <= 1000) {
      res.setHeader('Content-Type', imageType);
      imageResponse.pipe(res);
      return;
    }

    const smallerimage = sharp()
      .resize(100, 100, { fit: 'outside', width: 100, height: 100 })
      .png({ quality: 5, compressionLevel: 9 });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'max-age=31536000, immutable');

    imageResponse
      .pipe(smallerimage)
      .on('error', (error) => {
        console.log(error);
        res.status(400);
        res.end();
      })
      .pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
    return;
  }

  //   res.status(200).json({ name: 'John Doe' });
}
