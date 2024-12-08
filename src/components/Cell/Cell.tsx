import { BoardCell, BoardCellType } from "../../type/board.type.ts";
const colors = {
  [BoardCellType.Path]: 'bg-gray-500',
  [BoardCellType.Player]: 'bg-cyan-500',
  [BoardCellType.Goal]: 'bg-cyan-500',
  [BoardCellType.Wall]: 'bg-gray-200',
  [BoardCellType.Spawn]: 'bg-gray-500',
}

const images = {
  [BoardCellType.Path]: 'path-bg',
  [BoardCellType.Player]: 'player-bg',
  [BoardCellType.Goal]: 'goal-bg',
  [BoardCellType.Wall]: 'wall-bg',
  [BoardCellType.Spawn]: 'path-bg',
}

type CellProps = {
  value: BoardCell,
}

export const Cell = (value: CellProps) => {
  const props = value.value;
  const color = colors[props.type];

  if (props.type === BoardCellType.Player) return <div className={`w-10 h-10 ${props.mirrored ? 'mirror-bg' : ''} ${color} ${images[props.type]} inline-block`}></div>;

  if (props.fog && !props.visited) return <div className={`w-10 h-10 fog-bg ${props.mirrored ? 'mirror-bg' : ''} ${colors[BoardCellType.Wall]} inline-block`}></div>;

  return <div className={`w-10 h-10 ${props.mirrored ? 'mirror-bg' : ''} ${color} inline-block ${images[props.type]}`}></div>;

}
