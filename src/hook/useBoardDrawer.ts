import {BoardCharacter, BoardContent} from "../model/board.ts";

export const useBoardDrawer = <X extends number, Y extends number>(width: X, height: Y): BoardContent<X, Y> => {
  const board: BoardCharacter[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => "X")
  );

  return board as unknown as BoardContent<X, Y>;
};