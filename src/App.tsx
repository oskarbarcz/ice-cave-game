import './App.css'
import {Board} from "./components/Board.tsx";
import {drawBoard} from "./model/functions/drawBoard.tsx";
import {pushElementToBoard} from "./model/functions/pushElementToBoard.tsx";

function App() {
  const board = drawBoard(80, 80);

  pushElementToBoard(board, {x: 10, y: 30}, <span className="text-red-600">X</span>);

  return (
    <>
      <Board board={board} />
    </>
  )
}

export default App
