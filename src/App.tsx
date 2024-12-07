import './App.css';
import { drawFromBitmap } from './service/functions/drawBoard.tsx';
import { Grid } from './components/Grid.tsx';
import { useEffect, useRef, useState } from 'react';
import { bitmapService } from './service/bitmap.service.tsx';
import { Bitmap } from "./type/bitmap.type.ts";
import { BoardService } from "./service/board.service.ts";
import firstmapfile from './assets/logo.txt';

export default function App() {
  const [bitmap, setBitmap] = useState<Bitmap>([]);
  const [board, setBoard] = useState<BoardService | null>(null);
  const boardRef = useRef<BoardService>(new BoardService([]));

  let currentMap = firstmapfile;

  // Load bitmap on mount
  useEffect(() => {
    bitmapService(firstmapfile).then((loadedBitmap: Bitmap) => {
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
    updatedBoard.renderPlayer();
    boardRef.current = updatedBoard; // Store in ref

    // Trigger a re-render with the updated board
    setBoard(updatedBoard);

    const handleKeyUp = (event: KeyboardEvent) => {
      try {
        boardRef.current.movePlayer(event);
      }
      catch (e) {
        if ((e as Error).message == "You win!") {
          currentMap = 'src/assets/map.txt';
          bitmapService(currentMap).then((loadedBitmap: Bitmap) => {
            setBitmap(loadedBitmap);
          });
        }
      }
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
