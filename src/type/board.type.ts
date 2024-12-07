export enum BoardCell {
  Path = '0',
  Wall = '1',
  Player = '2',
  Goal = '5',
  Spawn = '6',
}
export type BoardRow = BoardCell[];
export type Board = BoardRow[];
