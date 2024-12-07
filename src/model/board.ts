export type CellValue = 0 /* path */ | 1 /* wall */ | 2 /* player */;
export type BoardRow = CellValue[];
export type BoardRows = BoardRow[];

export type PositionRef = {
  x: number,
  y: number,
}

export class BoardModel {
  board: BoardRows;

  constructor(rows: BoardRows) {
    this.board = rows;
  }

  renderPlayer = ({x, y}:PositionRef): void => {
    this.board[y-1][x-1] = 2;
  }

  getBoard = () => this.board;
}