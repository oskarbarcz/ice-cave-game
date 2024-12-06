import {BoardContent, BoardPosition} from "../board.ts";

export const pushElementToBoard =(board: BoardContent<number, number>, position: BoardPosition, element: any) => {
  board[position.y][position.x] = element;
}