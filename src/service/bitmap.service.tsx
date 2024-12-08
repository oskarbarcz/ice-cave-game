import {Bitmap, BitmapUrl} from "../type/bitmap.type.ts";

export const bitmapService = async (file : string): Promise<Bitmap> => {
  const response = await fetch(file);
  const text = await response.text();
  const lines = text.split('\n');
  const data = lines.map(line => line.split(''));
  return data as unknown as Bitmap;
}

export const bitmapListProvider = (): BitmapUrl[] => {
  return [
    'src/assets/maps/0.txt',
    'src/assets/maps/1.txt',
    'src/assets/maps/2.txt',
    'src/assets/maps/3.txt',
    'src/assets/maps/4.txt',
    'src/assets/maps/5.txt',
    'src/assets/maps/6.txt',
    'src/assets/maps/7.txt',
    'src/assets/maps/8.txt',
    'src/assets/maps/9.txt',
    'src/assets/maps/10.txt'
  ]
}