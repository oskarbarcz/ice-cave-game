import './App.css';
import { drawFromBitmap } from './service/functions/drawBoard.tsx';
import { Grid } from './components/Grid/Grid.tsx';
import { useEffect, useRef, useState } from 'react';
import { bitmapListProvider, bitmapService } from './service/bitmap.service.tsx';
import { Bitmap } from "./type/bitmap.type.ts";
import { BoardService } from "./service/board.service.ts";
import { Header } from "./components/Header/Header.tsx";

export default function App() {
  const [bitmap, setBitmap] = useState<Bitmap>([]);
  const [board, setBoard] = useState<BoardService | null>(null);
  const boardRef = useRef<BoardService>(new BoardService([]));

  const maps = bitmapListProvider();
  const [mapIndex, setMapIndex] = useState<number>(0);

  // Load bitmap on mount
  useEffect(() => {
    bitmapService(maps[mapIndex]).then((loadedBitmap: Bitmap) => {
      setBitmap(loadedBitmap);
    });
  }, [mapIndex]);

  // Update the board whenever bitmap changes
  useEffect(() => {
    if (bitmap.length === 0) {
      return;
    }

    // Update the board based on the loaded bitmap
    const updatedBoard = drawFromBitmap(bitmap, mapIndex in [0,1,2]);
    updatedBoard.renderPlayer();
    boardRef.current = updatedBoard;

    // Trigger a re-render with the updated board
    setBoard(updatedBoard);

    const handleKeyUp = (event: KeyboardEvent) => {
      try {
        boardRef.current.movePlayer(event);
      }
      catch (e) {
        if ((e as Error).message == "You win!") {
          setMapIndex(mapIndex + 1);
            const audio = new Audio('src/assets/grindr.mp3');
            audio.play();
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
      <Header mapIndex={mapIndex + 1}/>
      {board ? <Grid board={board}/> : <p>Loading...</p>}
    </>
  );
}
