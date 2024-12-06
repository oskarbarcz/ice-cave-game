export type BoardCharacter = string;

export type BoardContent<X extends number, Y extends number> = Array<{ length: Y } & Array<BoardCharacter>> & { length: X };
