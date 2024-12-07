import './App.css';
import { drawFromBitmap } from './service/functions/drawBoard.tsx';
import { Grid } from './components/Grid.tsx';
import { useEffect, useRef, useState } from 'react';
import { bitmapService } from './service/bitmap.service.tsx';
import { Bitmap } from "./type/bitmap.type.ts";
import { BoardService } from "./service/board.service.ts";

export default function App() {
  const [bitmap, setBitmap] = useState<Bitmap>([]);
  const [board, setBoard] = useState<BoardService | null>(null);
  const boardRef = useRef<BoardService>(new BoardService([]));

  const [maps] = useState<string[]>([
    'src/assets/map1.txt',
    'src/assets/map2.txt',
    'src/assets/map3.txt',
    'src/assets/map4.txt',
    'src/assets/map5.txt',
    'src/assets/map6.txt',
    'src/assets/map7.txt',
    'src/assets/map8.txt',
    'src/assets/map9.txt',
    'src/assets/map10.txt',
  ]);

  const [mapIndex, setMapIndex] = useState<number>(0);

  // Load bitmap on mount
  useEffect(() => {
    bitmapService(maps[mapIndex]).then((loadedBitmap: Bitmap) => {
      setBitmap(loadedBitmap);
    });
  }, [mapIndex, maps]);

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
          setMapIndex(mapIndex + 1);
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
    <p>ice cave level {mapIndex+1}</p>
      {board ? <Grid board={board} /> : <p>Loading...</p>}
    </>
  );
}
