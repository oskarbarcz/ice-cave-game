import {ReactElement} from "react";

export type BoardCharacter = ReactElement;

export type BoardContent<X extends number, Y extends number> = Array<{ length: Y } & Array<BoardCharacter[]>> & { length: X };

export type BoardPosition = {
  x: number,
  y: number
}