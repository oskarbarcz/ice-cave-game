import {drawBoard} from "../model/functions/drawBoard.tsx";
import {pushElementToBoard} from "../model/functions/pushElementToBoard.tsx";
import {Board} from "./Board.tsx";
import {useState} from "react";

export const Frame = () => {
  const [board, updateBoard] = useState(drawBoard(80, 80));

  return (
    <>
      <button onClick={() => {
        console.log('test');
        pushElementToBoard(
          board,
          updateBoard,
          {x: 30, y: 60},
          <span className="text-red-300">X</span>
        );
      }}>button</button>
      <Board board={board} />
    </>
  )
}