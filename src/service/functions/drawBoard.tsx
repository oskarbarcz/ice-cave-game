import {Board} from "../../type/board.type.ts";
import {Bitmap, BitmapCell, BitmapRow} from "../../type/bitmap.type.ts";
import {BoardService} from "../board.service.ts";

export const drawFromBitmap = (bitmap: Bitmap, shouldMapBeClear: boolean): BoardService => {
  const map: Board = bitmap.map((row: BitmapRow) => row.map((column: BitmapCell) =>  ({type: column, visited: false, fog: !shouldMapBeClear}))) as unknown as Board;

  return new BoardService(map);
};
