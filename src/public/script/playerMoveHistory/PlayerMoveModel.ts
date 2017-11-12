import { PLAYER } from '../constants/playerConstants';

class PlayerMoveModel {
    public player: PLAYER;
    public position: number[];
    public capturedPieces: number[][] = [];

    constructor(
        player: PLAYER,
        position: number[],
        capturedPieces: number[][],
    ) {
        this.player = player;
        this.position = position;
        this.capturedPieces = capturedPieces;
    }
}

export default PlayerMoveModel;
