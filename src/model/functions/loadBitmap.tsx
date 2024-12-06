import textfile from "../../assets/map.txt";
var lines;
var data: string[][] = [];

export const loadBitmap = (): Promise<string[][]|void> => {
  return fetch(textfile)
    .then(response => response.text())
    .then(text => {
      lines = text.split('\n');
      data = lines.map(line => line.split(''));

      return data as string[][];
    })
    .catch(error => console.error('Error fetching the text file:', error));
}

export const loadAsyncBitmap = async () => {
    return await loadBitmap();
}