import textfile from "../../assets/map.txt";
var lines;
var data: string[][] = [];

export const loadBitmap = async (): Promise<string[][]> => {
  const response = await fetch(textfile);
  const text = await response.text();
  lines = text.split('\n');
  data = lines.map(line => line.split(''));
  return data as string[][];
}