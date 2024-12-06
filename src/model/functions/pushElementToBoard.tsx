import {BoardContent, BoardPosition} from "../board.ts";

export const pushElementToBoard = (
  board: BoardContent<80, 80>,
  setBoard: Function,
  position: BoardPosition,
  element: any
): void => {
  const newBoard = new Array(...board) as BoardContent<80, 80>;
  newBoard[position.y][position.x] = element;
  setBoard(newBoard);
}