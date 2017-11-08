import { positionToIdTranslator } from '../translator/stageCellTranslators';
import {
    GAME_BOARD_INITIAL_STATE,
    VECTOR_FROM_POSITION,
} from '../constants/gameBoardConstants';
import { PLAYER } from '../constants/playerConstants';

class GameBoardController {
    public gameBoard: number[][] = GAME_BOARD_INITIAL_STATE;

    private _vectorsToOpponentCache: number[][] = [];

    public collectAvailableMovesForPlayer(player: PLAYER): number[][] {
        const availableMoveList: number[][] = [];

        for (let i = 0; i < this.gameBoard.length; i++) {
            for (let j = 0; j < this.gameBoard[i].length; j++) {
                const position = [i, j];

                if (this._getPlayerAtPosition(position) !== PLAYER.INVALID_PLAYER) {
                    continue;
                }

                if (this._isCapturablePosition(position, player)) {
                    availableMoveList.push(position);
                }
            }
        }

        return availableMoveList;
    }

    public collectPositionsAlongVectorUntilPlayer(vector: number[], position: number[], player: PLAYER, sum: number[][]): number[][] {
        const comparisonPosition: number[] = this._calculateComparisonPositionFromPositionWithVector(position, vector);
        const comparisonPlayer: PLAYER = this._getPlayerAtPosition(comparisonPosition);

        if (!this.isValidPosition(comparisonPosition)) {
            return [];
        }

        if (comparisonPlayer === this._getOpposingPlayerNumber(player)) {
            sum.push(comparisonPosition);

            return this.collectPositionsAlongVectorUntilPlayer(vector, comparisonPosition, player, sum);
        } else if (comparisonPlayer === PLAYER.INVALID_PLAYER) {
            return [];
        }

        return sum;
    }

    public countPiecesForPlayer(player: PLAYER): number {
        let sum = 0;

        for (let i = 0; i < this.gameBoard.length; i++) {
            for (let j = 0; j < this.gameBoard[i].length; j++) {
                const position = [i, j];

                if (this._getPlayerAtPosition(position) !== player) {
                    continue;
                }

                sum++;
            }
        }

        return sum;
    }

    public doesCaptureOpposingPlayerPiece(position: number[], player: PLAYER): boolean {
        this._vectorsToOpponentCache = this.findVectorsToOpposingPlayerPiece(position, player);

        if (this._vectorsToOpponentCache.length === 0) {
            return false;
        }

        for (let i = 0; i < this._vectorsToOpponentCache.length; i++) {
            const vector = this._vectorsToOpponentCache[i];

            // returns true on the first capture formation, there may be several
            if (this.isCapturePieceAlongVector(vector, position, player)) {
                return true;
            }
        }

        return false;
    }

    public findVectorsToOpposingPlayerPiece(position: number[], player: PLAYER): number[][] {
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

    public playerCanMoveToPosition(position: number[], player: PLAYER): boolean {
        return this.isLegalMove(position) && this.doesCaptureOpposingPlayerPiece(position, player);
    }

    // TODO: split this up
    public isCapturePieceAlongVector(vector: number[], position: number[], player: PLAYER): boolean {
        const comparisonPosition: number[] = this._calculateComparisonPositionFromPositionWithVector(position, vector);
        const comparisonPlayer: PLAYER = this._getPlayerAtPosition(comparisonPosition);

        if (!this.isValidPosition(comparisonPosition)) {
            return false;
        }

        if (comparisonPlayer === this._getOpposingPlayerNumber(player)) {
            return this.isCapturePieceAlongVector(vector, comparisonPosition, player);
        }

        return comparisonPlayer === player;
    }

    public isGameComplete(): boolean {
        let sum: number = 0;
        const pieceCount: number = this.gameBoard.length * this.gameBoard[0].length;

        for (let i = 0; i < this.gameBoard.length; i++) {
            for (let j = 0; j < this.gameBoard[0].length; j++) {
                const position: number[] = [i, j];
                const playerAtPosition: PLAYER = this._getPlayerAtPosition(position);

                if (playerAtPosition !== PLAYER.INVALID_PLAYER) {
                    continue;
                }

                sum++;
            }
        }

        return sum === 0;
    }

    public isLegalMove(position: number[]): boolean {
        return this._getPlayerAtPosition(position) === PLAYER.INVALID_PLAYER;
    }

    public isValidPosition(position: number[]): boolean {
        return position[0] >= 0 &&
            position[0] < this.gameBoard.length &&
            position[1] >= 0 &&
            position[1] < this.gameBoard[0].length;
    }

    public reset(): void {
        this.gameBoard = GAME_BOARD_INITIAL_STATE;
    }

    public resetCacheAfterTurn(): void {
        this._vectorsToOpponentCache = [];
    }

    public updatePlayerAtPosition(player: PLAYER, position: number[]): void {
        this.gameBoard[position[0]][position[1]] = player;
    }

    public updateGameBoardStateForPendingMove(player: PLAYER, position: number[]): void {
        let positionsToUpdate: number[][] = [];

        for (let i = 0; i < this._vectorsToOpponentCache.length; i++) {
            const vector: number[] = this._vectorsToOpponentCache[i];
            const positionsAlongVectorToPlayer: number[][] = this.collectPositionsAlongVectorUntilPlayer(vector, position, player, []);

            positionsToUpdate = positionsToUpdate.concat(positionsAlongVectorToPlayer);
        }

        this._updateGameBoardWithCapturedPieces(player, positionsToUpdate);
    }

    private _calculateComparisonPositionFromPositionWithVector(position: number[], vector: number[]): number[] {
        return [
            position[0] + vector[0],
            position[1] + vector[1],
        ];
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

    private _isCapturablePosition(position: number[], player: PLAYER): boolean {
        const availableMoveList: number[][] = [];

        for (let v = 0; v < VECTOR_FROM_POSITION.length; v++) {
            const vector = VECTOR_FROM_POSITION[v];
            const foundPositionsForVector: number[][] = this.collectPositionsAlongVectorUntilPlayer(vector, position, player, []);

            if (foundPositionsForVector.length === 0) {
                continue;
            }

            return true;
        }
    }

    private _updateGameBoardWithCapturedPieces(player: PLAYER, positionsToUpdate: number[][]): void {
        for (let i = 0; i < positionsToUpdate.length; i++) {
            const position: number[] = positionsToUpdate[i];

            this.updatePlayerAtPosition(player, position);
        }
    }

}

export default GameBoardController;
