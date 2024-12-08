type HeaderProps = {
  mapIndex: number
}

export function Header({mapIndex}: HeaderProps) {
  return (
    <div className="pb-6">
      <p>ice cave - level {mapIndex}</p>
      <p>use arrow keys to navigate</p>
    </div>
  );
}