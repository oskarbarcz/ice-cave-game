import {useEffect, useState} from 'react';
import './App.css'
import {Frame} from "./components/Frame.tsx";
import { drawBoard } from './model/functions/drawBoard.tsx';
import { loadBitmap } from './model/functions/loadBitmap.tsx';

function App() {
  const [board, updateBoard] = useState(drawBoard(80, 80));
  const [bitmap, setBitmap] = useState<string[][]>([]);

  useEffect( () =>{
    async function getBitmap() {
      const bitmap = await loadBitmap();
      setBitmap(bitmap);
    }

    if(bitmap.length === 0) {
      getBitmap();
    }
  }, []);

  useEffect( () =>{
    console.log('rerender because bitmap was updated!');
  }, [bitmap]);

  return (
    <>
      <Frame board={board} updateBoard={updateBoard} />
    </>
  )
}

export default App
