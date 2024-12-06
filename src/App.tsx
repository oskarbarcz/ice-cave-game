import { useState } from 'react';
import './App.css'
import {Frame} from "./components/Frame.tsx";
import { drawBoard } from './model/functions/drawBoard.tsx';
import { loadBitmap } from './model/functions/loadBitmap.tsx';

function App() {

  const [board, updateBoard] = useState(drawBoard(80, 80));


  const bitmap =  loadBitmap();
  console.log(bitmap);



  return (
    <>
      <Frame board={board} updateBoard={updateBoard} />
    </>
  )
}

export default App
