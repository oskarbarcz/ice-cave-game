import {Cell} from "./Cell.tsx";
import {BoardModel, BoardRow, CellValue} from "../model/board.ts";

type BoardProps = {
  board: BoardModel,
}

export const Board =({board}: BoardProps) => {
  return (
    <div className="leading-3" style={{letterSpacing: '0.20em'}}>
       {board.getBoard().map((row: BoardRow, y: number) => <div key={y}>{
           row.map((value: CellValue, x: number) => <Cell key={x} value={value} />)}
         </div>)}
    </div>
  );
}

