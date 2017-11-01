enum POSITION_INDEX {
    X,
    Y
}

const ID_SEPARATOR = '-';

export function idToPositionTranslator(id: string): number[] {
    const positionPieces = id.split(ID_SEPARATOR);

    // using the meastes trick to cast a string to a number
    return [
        +positionPieces[POSITION_INDEX.X],
        +positionPieces[POSITION_INDEX.Y],
    ];
}

export function positionToIdTranslator(position: number[]): string {
    return `${position[POSITION_INDEX.X]}-${POSITION_INDEX.Y}`;
}
