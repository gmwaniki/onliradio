import fs from 'node:fs';
import path from 'node:path';

import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'verysharp';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  const svgFile = path.resolve('.', 'public/musicnote.svg');
  try {
    if (!url || Array.isArray(url)) {
      throw new Error('Invalid url');
    }

    const imageUrl = new URL(url);
    const response = await fetch(imageUrl);
    const responseImageBuffer = await response.arrayBuffer();
    const sharpPipe = sharp(responseImageBuffer);
    const newImage = await sharpPipe
      .resize({
        fit: 'contain',
        width: 250,
        height: 250,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .webp({ quality: 20 })

      .toBuffer();

    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    res.send(newImage);
  } catch (error) {
    const defaultImage = fs.createReadStream(svgFile);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    defaultImage.pipe(res);
  }
}
