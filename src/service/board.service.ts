import { PositionRef } from "../type/position.type.ts";
import { Board, BoardCellType, BoardRow } from "../type/board.type.ts";

export class BoardService {
  board: Board;
  playerPosition: PositionRef = { x: 0, y: 0 };

  constructor(rows: Board) {
    this.board = rows;
  }

  renderPlayer = (): void => {
    let x = -1, y = -1;
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col].type === BoardCellType.Spawn) {
          x = col;
          y = row;
          break;
        }
      }
      if (x !== -1 && y !== -1) break;
    }

    this.board[y][x].type = BoardCellType.Player;
    this.playerPosition.x = x;
    this.playerPosition.y = y;
  }

  movePlayer = (event: KeyboardEvent): void => {
    const { x, y } = this.eventToNewPosition(event);

    if (this.board[y][x].type === BoardCellType.Wall) {
      return;
    }

    if (this.board[y][x].type == BoardCellType.Goal) {
      console.log('You win!');
      throw new Error('You win!');
    }

    this.board[y][x].type = BoardCellType.Player;
    this.board[y][x].visited = true;
    this.board[y][x].fog = false;
    this.board[this.playerPosition.y][this.playerPosition.x].type = BoardCellType.Path;
    this.board[this.playerPosition.y][this.playerPosition.x].visited = true;

    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    directions.forEach(direction => {
      const newX = x + direction.x;
      const newY = y + direction.y;

      if (newX >= 0 && newX < this.board[0].length && newY >= 0 && newY < this.board.length) {
      this.board[newY][newX].fog = false;
      }
    });

    this.playerPosition = { x, y };
  }

  getPlayerPosition = (): PositionRef => this.playerPosition;

  getBoard = () => this.board;

  map<T>(callback: (value: BoardRow, index: number, array: Board) => T): T[] {
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
      case 'r':
        this.board.forEach(row => row.forEach(cell => cell.visited = true));
        console.log('skip!');
        return playerPosition;
      case 'f':
        this.board.forEach(row => row.forEach(cell => cell.fog = false));
        console.log('fog!');
        return playerPosition;
      default:
        return playerPosition;
    }
  }
}