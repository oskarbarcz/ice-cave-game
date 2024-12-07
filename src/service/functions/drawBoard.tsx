import {Board} from "../../type/board.type.ts";
import {Bitmap, BitmapCell, BitmapRow} from "../../type/bitmap.type.ts";
import {BoardService} from "../board.service.ts";

export const drawFromBitmap = (bitmap: Bitmap): BoardService => {
  const map: Board = bitmap.map((row: BitmapRow) => row.map((column: BitmapCell) => column)) as unknown as Board;

  return new BoardService(map);
};
