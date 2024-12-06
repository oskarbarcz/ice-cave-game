import {BoardCharacter, BoardContent} from "../model/board.ts";

type BoardProps<X extends number, Y extends number> = {
  board: BoardContent<X, Y>
}

export const Board = <X extends number, Y extends number> ({board}: BoardProps<X, Y>) => {
  return (
    <div className="leading-3 text-xs" style={{letterSpacing: '0.40em'}}>
       {board.map((row: string[], indexY: number) => <div key={indexY}>{
         row.map((element: BoardCharacter, indexX: number) => <span key={indexX}>{element}</span>)
       }</div>)}
    </div>
  );
}

