import {BoardModel, BoardRow, CellValue} from "../board.ts";

export const drawFromBitmap = (bitmap: BoardRow[]): BoardModel => {
  const map =  bitmap.map((row: BoardRow) => row.map((column: CellValue) => column));

  return new BoardModel(map);
};
