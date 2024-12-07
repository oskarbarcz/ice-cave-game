import './App.css';
import { drawFromBitmap } from './service/functions/drawBoard.tsx';
import { Grid } from './components/Grid.tsx';
import { useEffect, useRef, useState } from 'react';
import { bitmapService } from './service/bitmap.service.tsx';
import {Bitmap} from "./type/bitmap.type.ts";
import {BoardService} from "./service/board.service.ts";

export default function App() {
  const [bitmap, setBitmap] = useState<Bitmap>([]);
  const [board, setBoard] = useState<BoardService | null>(null);
  const boardRef = useRef<BoardService>(new BoardService([]));

  // Load bitmap on mount
  useEffect(() => {
    bitmapService().then((loadedBitmap: Bitmap) => {
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

    const handleKeyUp = (event: KeyboardEvent) => {
      boardRef.current.movePlayer(event);
      setBoard(new BoardService(boardRef.current.getBoard()));
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [bitmap]);

  return (
    <>
      {board ? <Grid board={board} /> : <p>Loading...</p>}
    </>
  );
}
