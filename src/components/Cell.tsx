import { CellValue } from "../model/board.ts";

type CellProps = {
  value: CellValue,
}

export const Cell = ({ value }: CellProps) => {
  if (value == 0) {
    return <div className="w-4 h-4 bg-gray-500 inline-block"></div>;
  }

  if (value == 2) {
    return <div className="w-4 h-4 bg-red-500 inline-block"></div>;
  }

  if (value == 5) {
    return <div className="w-4 h-4 bg-cyan-500 inline-block"></div>;
  }


  return <div className="w-4 h-4 bg-gray-200 inline-block"></div>;

}

