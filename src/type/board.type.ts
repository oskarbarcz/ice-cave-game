export enum BoardCellType {
  Path = '0',
  Wall = '1',
  Player = '2',
  Bomb = '4',
  Goal = '5',
  Spawn = '6',
}

export type BoardCell = {
  type: BoardCellType;
  visited: boolean;
  fog: boolean;
  mirrored: boolean;
}

export type BoardRow = BoardCell[];
export type Board = BoardRow[];
