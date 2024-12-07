import './App.css';
import { drawFromBitmap } from './model/functions/drawBoard.tsx';
import { Board } from './components/Board.tsx';
import { useEffect, useRef, useState } from 'react';
import { loadBitmap } from './model/functions/loadBitmap.tsx';
import { BoardModel } from './model/board.ts';
import { Bitmap } from './model/bitmap.ts';

export default function App() {
  const [bitmap, setBitmap] = useState<Bitmap>([]);
  const [board, setBoard] = useState<BoardModel | null>(null);
  const boardRef = useRef<BoardModel>(new BoardModel([]));

  // Load bitmap on mount
  useEffect(() => {
    loadBitmap().then((loadedBitmap: Bitmap) => {
      setBitmap(loadedBitmap);
    });
  }, []);

  // Update the board whenever bitmap changes
  useEffect(() => {
    if (bitmap.length === 0) {
      return;
    }

    // Update the board based on the loaded bitmap
    const updatedBoard = drawFromBitmap(bitmap);
    updatedBoard.renderPlayer({ x: 19, y: 2 });
    boardRef.current = updatedBoard; // Store in ref

    // Trigger a re-render with the updated board
    setBoard(updatedBoard);
  }, [bitmap]);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {

      const playerPosition = boardRef.current.getPlayerPosition();
      let newPosition = boardRef.current.getPlayerPosition();
      switch (event.key) {
        case 'ArrowRight':
          newPosition = { x: playerPosition.x + 1, y: playerPosition.y };
          break;
        case 'ArrowLeft':
          newPosition = { x: playerPosition.x - 1, y: playerPosition.y };
          break;
        case 'ArrowDown':
          newPosition = { x: playerPosition.x, y: playerPosition.y + 1 };
          break;
        case 'ArrowUp':
          newPosition = { x: playerPosition.x, y: playerPosition.y - 1 };
          break;
        default:
          return;
      }
      boardRef.current.movePlayer(newPosition);
      setBoard(new BoardModel(boardRef.current.getBoard()));
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <>
      {board ? <Board board={board} /> : <p>Loading...</p>}
    </>
  );
}
