import { CellValue } from "../model/board.ts";

type CellProps = {
  value: CellValue,
}

export const Cell = ({ value }: CellProps) => {
  switch (value) {
    case CellValue.Path:
      return <div className="w-4 h-4 bg-gray-500 inline-block"></div>;
    case CellValue.Player:
      return <div className="w-4 h-4 bg-red-500 inline-block"></div>;
    case CellValue.Goal:
      return <div className="w-4 h-4 bg-cyan-500 inline-block"></div>;
    default:
      return <div className="w-4 h-4 bg-gray-200 inline-block"></div>;
  }

}

