import { BoardCell } from "../type/board.type.ts";

type CellProps = {
  value: BoardCell,
}

const colors = {
  [BoardCell.Path]: 'bg-gray-500',
  [BoardCell.Player]: 'bg-red-500',
  [BoardCell.Goal]: 'bg-cyan-500',
  [BoardCell.Wall]: 'bg-gray-200',
  [BoardCell.Spawn]: 'bg-gray-500',
}

export const Cell = ({ value }: CellProps) => {
  const color = colors[value];

  return <div className={`w-4 h-4 ${color} inline-block`}></div>;
}

