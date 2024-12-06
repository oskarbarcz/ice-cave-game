import {BoardCharacter, BoardContent} from "../board.ts";

export const drawBoard = <X extends number, Y extends number>(width: X, height: Y): BoardContent<X, Y> => {
  const board: BoardCharacter[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => <span>.</span>)
  );

  return board as unknown as BoardContent<X, Y>;
};