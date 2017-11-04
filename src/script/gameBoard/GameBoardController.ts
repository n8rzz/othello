import {
    GAME_BOARD_INITIAL_STATE,
    VECTOR_DIRECTION,
    VECTOR_FROM_POSITION,
} from '../constants/gameBoardConstants';
import { PLAYER } from '../constants/playerConstants';

class GameBoardController {
    public gameBoard: number[][] = GAME_BOARD_INITIAL_STATE;

    public reset(): void {
        this.gameBoard = GAME_BOARD_INITIAL_STATE;
    }

    public doesCaptureOpposingPlayerPiece(position: number[], player: PLAYER): boolean {
        const vectorsToOpposingPiece: number[] = this._findVectorsToOpposingPlayerPiece(position, player);

        return vectorsToOpposingPiece.length !== 0;
    }

    public playerCanMoveToPosition(position: number[], player: PLAYER): boolean {
        return this.isLegalMove(position) && this.doesCaptureOpposingPlayerPiece(position, player);
    }

    public isLegalMove(position: number[]): boolean {
        return this._getPlayerAtPosition(position) === PLAYER.INVALID_PLAYER;
    }

    public isValidPosition(position: number[]): boolean {
        return position[0] >= 0 &&
            position[1] >= 0;
    }

    public updatePlayerAtPosition(player: PLAYER, position: number[]): void {
        this.gameBoard[position[0]][position[1]] = player;
    }

    private _calculateComparisonPositionFromPositionWithVector(position: number[], vector: number[]): number[] {
        return [
            position[0] + vector[0],
            position[1] + vector[1],
        ];
    }

    private _findVectorsToOpposingPlayerPiece(position: number[], player: PLAYER): number[] {
        const foundVectors: any[] = [];

        for (let i = 0; i < VECTOR_FROM_POSITION.length; i++) {
            const vector: number[] = VECTOR_FROM_POSITION[i];
            const comparePosition: number[] = this._calculateComparisonPositionFromPositionWithVector(position, vector);
            const comparePlayer: PLAYER = this._getPlayerAtPosition(comparePosition);

            if (comparePlayer === player || comparePlayer === PLAYER.INVALID_PLAYER) {
                continue;
            }

            foundVectors.push(vector);
        }

        return foundVectors;
    }

    private _getPlayerAtPosition(position: number[]): PLAYER {
        if (!this.isValidPosition(position)) {
            return PLAYER.INVALID_PLAYER;
        }

        return this.gameBoard[position[0]][position[1]];
    }

    private _getOpposingPlayerNumber(currentPlayer: PLAYER): PLAYER {
        const opposingPlayer: PLAYER = currentPlayer === PLAYER.ONE
            ? PLAYER.TWO
            : PLAYER.ONE;

        if (currentPlayer === PLAYER.INVALID_PLAYER) {
            return PLAYER.INVALID_PLAYER;
        }

        return opposingPlayer;
    }

}

export default GameBoardController;
