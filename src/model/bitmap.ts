export enum BitmapCell {
    Path = 0,
    Wall = 1,
    Goal = 5
}
export type BitmapRow = BitmapCell[];
export type Bitmap = BitmapRow[];