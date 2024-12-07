export enum BoardCellType {
  Path = '0',
  Wall = '1',
  Player = '2',
  Goal = '5',
  Spawn = '6',
}

export type BoardCell = {
  type: BoardCellType;
  visited: boolean;
  fog: boolean;
}

export type BoardRow = BoardCell[];
export type Board = BoardRow[];
