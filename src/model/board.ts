export enum CellValue {
  Path = '0',   // path
  Wall = '1',   // wall
  Player = '2', // player
  Goal = '5',   // goal
  Spawn = '6', // spawn
}
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
    this.board[y-1][x-1] = CellValue.Player;
    this.playerPosition.x = x-1;
    this.playerPosition.y = y-1;
  }

  movePlayer = ({x,y}:PositionRef): boolean => {
    if (this.board[y][x] != CellValue.Wall) {
      if (this.board[y][x] == CellValue.Goal) {
        console.log('You win!');
        throw new Error('You win!');
      }
      this.board[y][x] = CellValue.Player;
      this.board[this.playerPosition.y][this.playerPosition.x] = CellValue.Path;
      this.playerPosition = { x, y };
      return true;
    }
    return false;
  }

  getPlayerPosition = (): PositionRef => this.playerPosition;

  getBoard = () => this.board;
}