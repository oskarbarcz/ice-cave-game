import textfile from "../../assets/logo.txt";
import {Bitmap} from "../bitmap.ts";


export const loadBitmap = async (): Promise<Bitmap> => {
  const response = await fetch(textfile);
  const text = await response.text();
  const lines = text.split('\n');
  const data = lines.map(line => line.split(''));
  return data as unknown as Bitmap;
}