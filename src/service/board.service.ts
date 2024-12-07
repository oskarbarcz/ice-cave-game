import {PositionRef} from "../type/position.type.ts";
import {Board, BoardCell, BoardRow} from "../type/board.type.ts";

export class BoardService {
  board: Board;
  playerPosition: PositionRef = { x: 0, y: 0 };

  constructor(rows: Board) {
    this.board = rows;
  }

  renderPlayer = ({x, y}:PositionRef): void => {
    this.board[y-1][x-1] = BoardCell.Player;
    this.playerPosition.x = x-1;
    this.playerPosition.y = y-1;
  }

  movePlayer = (event: KeyboardEvent): void => {
    const {x, y} = this.eventToNewPosition(event);

    if (this.board[y][x] === BoardCell.Wall) {
      return;
    }

    if (this.board[y][x] == BoardCell.Goal) {
      console.log('You win!');
      throw new Error('You win!');
    }

    this.board[y][x] = BoardCell.Player;
    this.board[this.playerPosition.y][this.playerPosition.x] = BoardCell.Path;
    this.playerPosition = { x, y };
  }

  getPlayerPosition = (): PositionRef => this.playerPosition;

  getBoard = () => this.board;

  map<T>(callback: (value: BoardRow, index: number, array: Board) => T): T[]{
    return this.board.map(
      (value: BoardRow, index: number, array) => callback(value, index, array)
    );
  }

  private eventToNewPosition = (event: KeyboardEvent): PositionRef => {
    const playerPosition = this.getPlayerPosition();
    switch (event.key) {
      case 'ArrowRight':
        return { x: playerPosition.x + 1, y: playerPosition.y };
      case 'ArrowLeft':
        return { x: playerPosition.x - 1, y: playerPosition.y };
      case 'ArrowDown':
        return { x: playerPosition.x, y: playerPosition.y + 1 };
      case 'ArrowUp':
        return { x: playerPosition.x, y: playerPosition.y - 1 };
      default:
        return playerPosition;
    }
  }
}