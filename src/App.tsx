import './App.css';
import { drawFromBitmap } from './service/functions/drawBoard.tsx';
import { Grid } from './components/Grid/Grid.tsx';
import { useEffect, useRef, useState } from 'react';
import { bitmapListProvider, bitmapService } from './service/bitmap.service.tsx';
import { Bitmap } from "./type/bitmap.type.ts";
import { BoardService } from "./service/board.service.ts";
import { Header } from "./components/Header/Header.tsx";
import { WarningContainer } from "./components/WarningContainer/WarningContainer.tsx";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen.tsx";
import { YouAreBombedScreen } from "./components/YouAreBombedScreen/YouAreBombedScreen.tsx";
import { Copyright } from "./components/Copyright/Copyright.tsx";
import { VictoryScreen } from './components/VictoryScreen/VictoryScreen.tsx';

export default function App() {
  const [bitmap, setBitmap] = useState<Bitmap>([]);
  const [board, setBoard] = useState<BoardService | null>(null);
  const boardRef = useRef<BoardService>(new BoardService([]));

  const maps = bitmapListProvider();
  const [mapIndex, setMapIndex] = useState<number>(0);

  const [displayScreen, setDisplayScreen] = useState<string>("loading");

  // Create and play background music
  useEffect(() => {
    const backgroundMusic = new Audio('assets/audio/holiday-bgm.mp3');
    backgroundMusic.loop = true;

    const playMusic = () => {
      backgroundMusic.volume = 0.1;
      console.log('Playing music');
      backgroundMusic.play();
      document.removeEventListener('click', playMusic);
    };

    document.addEventListener('click', playMusic);

    return () => {
      backgroundMusic.pause();
      console.log('Music paused');
      backgroundMusic.currentTime = 0;
      document.removeEventListener('click', playMusic);
    };
  }, []);


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
    const updatedBoard = drawFromBitmap(bitmap, mapIndex in [0, 1, 2]);
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
          const audio = new Audio('assets/audio/next-level-sound.mp3');
          audio.play();
          if (mapIndex+1 === maps.length) {
            setBoard(null);
            window.removeEventListener('keyup', handleKeyUp);
            setDisplayScreen("victory");
            return;
          }
          setMapIndex(mapIndex + 1);
        }
        if ((e as Error).message == "You are dead") {
          setBoard(null);
          window.removeEventListener('keyup', handleKeyUp);
          setDisplayScreen("bomba");
          return;
        }

      }
      setBoard(new BoardService(boardRef.current.getBoard()));
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [mapIndex, bitmap]);

  return (
    <>
      <Header mapIndex={mapIndex + 1} />
      {board ? <Grid board={board} /> :
        displayScreen === "loading" ? <LoadingScreen /> :
          displayScreen === "bomba" ? <YouAreBombedScreen /> : null}
      {displayScreen === "victory" ? <VictoryScreen /> : displayScreen === "bomba" ? null : <WarningContainer mapIndex={mapIndex} />}
      <Copyright />
    </>
  );
}
