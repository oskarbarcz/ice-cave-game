export type CellValue = 0 /* path */ | 1 /* wall */ | 2 /* player */ | 5 /* goal */;
export type BoardRow = CellValue[];
export type BoardRows = BoardRow[];

export type PositionRef = {
  x: number,
  y: number,
}

export class BoardModel {
  board: BoardRows;

  playerPosition: PositionRef = { x: 0, y: 0 };

  constructor(rows: BoardRows) {
    this.board = rows;
  }

  renderPlayer = ({x, y}:PositionRef): void => {
    this.board[y-1][x-1] = 2;
    this.playerPosition.x = x-1;
    this.playerPosition.y = y-1;
  }

  movePlayer = ({x,y}:PositionRef): boolean => {
    if (this.board[y][x] != 1) {
      if (this.board[y][x] == 5) {
        console.log('You win!');
        throw new Error('You win!');
      }
      this.board[y][x] = 2;
      this.board[this.playerPosition.y][this.playerPosition.x] = 0;
      this.playerPosition = { x, y };
      return true;
    }
    return false;
  }

  getPlayerPosition = (): PositionRef => this.playerPosition;

  getBoard = () => this.board;
}