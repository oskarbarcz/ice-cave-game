import {Cell} from "./Cell.tsx";
import {BoardRow, BoardCell} from "../type/board.type.ts";
import {BoardService} from "../service/board.service.ts";

type BoardProps = {
  board: BoardService,
}

export const Grid =({board}: BoardProps) => {
  return (
    <div className="leading-3">
       {board.map((row: BoardRow, y: number) => <div key={y}>{
           row.map((value: BoardCell, x: number) => <Cell key={x} value={value} />)}
         </div>)}
    </div>
  );
}

