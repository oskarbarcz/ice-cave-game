import { BoardCell, BoardCellType } from "../type/board.type.ts";
const colors = {
  [BoardCellType.Path]: 'bg-gray-500',
  [BoardCellType.Player]: 'bg-red-500',
  [BoardCellType.Goal]: 'bg-cyan-500',
  [BoardCellType.Wall]: 'bg-gray-200',
  [BoardCellType.Spawn]: 'bg-gray-500',
}

type CellProps = {
  value: BoardCell,
}

export const Cell = (value: CellProps) => {
  const props = value.value;
  const color = colors[props.type];

  if (props.type === BoardCellType.Player) return <div className={`w-4 h-4 ${color} inline-block`}></div>;

  if (props.fog && !props.visited) return <div className={`w-4 h-4 ${colors[BoardCellType.Wall]} inline-block`}></div>;

  return <div className={`w-4 h-4 ${color} inline-block`}></div>;

}
