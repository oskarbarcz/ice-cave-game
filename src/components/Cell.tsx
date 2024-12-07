import { CellValue } from "../model/board.ts";

type CellProps = {
  value: CellValue,
}

const colors = {
  [CellValue.Path]: 'bg-gray-500',
  [CellValue.Player]: 'bg-red-500',
  [CellValue.Goal]: 'bg-cyan-500',
  [CellValue.Wall]: 'bg-gray-200',
}

export const Cell = ({ value }: CellProps) => {
  const color = colors[value];

  return <div className={`w-4 h-4 ${color} inline-block`}></div>;
}

