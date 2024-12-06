import {BoardContent} from "../model/board.ts";

type BoardProps<X extends number, Y extends number> = {
  board: BoardContent<X, Y>
}

export const Board = <X extends number, Y extends number> ({board}: BoardProps<X, Y>) => {
  return (
    <div className="leading-3 text-xs" style={{letterSpacing: '0.40em'}}>
       {board.map((row, indexY: number) => <div key={indexY}>{
         row.map((element, indexX: number) => <span key={indexX}>{element}</span>)
       }</div>)}
    </div>
  );
}

