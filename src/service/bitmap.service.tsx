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
    'assets/maps/0.txt',
    'assets/maps/1.txt',
    'assets/maps/2.txt',
    'assets/maps/3.txt',
    'assets/maps/4.txt',
    'assets/maps/5.txt',
    'assets/maps/6.txt',
    'assets/maps/7.txt',
    'assets/maps/8.txt',
    'assets/maps/9.txt',
    'assets/maps/10.txt'
  ]
}