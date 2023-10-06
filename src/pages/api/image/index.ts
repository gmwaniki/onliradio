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
      .resize(100, 100, {
        fit: 'contain',
        width: 100,
        height: 100,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ quality: 5, compressionLevel: 9 })
      .toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.send(newImage);
  } catch (error) {
    const defaultImage = fs.createReadStream(svgFile);
    res.setHeader('Content-Type', 'image/svg+xml');
    defaultImage.pipe(res);
  }
}
