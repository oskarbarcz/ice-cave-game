import './App.css'
import {Board} from "./components/Board.tsx";
import {useBoardDrawer} from "./hook/useBoardDrawer.ts";

function App() {
  const board = useBoardDrawer(80, 80);

  return (
    <>
      <Board board={board} />
    </>
  )
}

export default App
