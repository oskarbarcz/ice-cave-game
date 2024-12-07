import {Bitmap} from "../type/bitmap.type.ts";


export const bitmapService = async (mapfile : string): Promise<Bitmap> => {
  const response = await fetch(mapfile);
  const text = await response.text();
  const lines = text.split('\n');
  const data = lines.map(line => line.split(''));
  return data as unknown as Bitmap;
}