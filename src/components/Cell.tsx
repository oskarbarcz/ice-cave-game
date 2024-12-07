import {CellValue} from "../model/board.ts";

type CellProps = {
  value: CellValue,
}

export const Cell =({value}: CellProps) => {
  switch(value) {
    case 0:
      return <div className="w-4 h-4 bg-gray-500 inline-block"></div>;
    case 2:
      return <div className="w-4 h-4 bg-red-500 inline-block"></div>;
    case 5:
      return <div className="w-4 h-4 bg-cyan-500 inline-block"></div>;
    default:
      return <div className="w-4 h-4 bg-gray-200 inline-block"></div>;
  }
}

