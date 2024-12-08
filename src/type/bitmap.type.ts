export enum BitmapCell {
    Path = 0,
    Wall = 1,
    Bomb = 4,
    Goal = 5,
    Spawn = 6,
}
export type BitmapRow = BitmapCell[];

export type Bitmap = BitmapRow[];

export type BitmapUrl = string;