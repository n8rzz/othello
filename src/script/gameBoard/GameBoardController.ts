import { GAME_BOARD_INITIAL_STATE } from '../constants/gameBoardConstants';
import { PLAYER } from '../constants/playerConstants';

class GameBoardController {
    public gameBoard: number[][] = GAME_BOARD_INITIAL_STATE;

    public reset(): void {
        this.gameBoard = GAME_BOARD_INITIAL_STATE;
    }

    public isLegalMove(position: number[]): boolean {
        return this._getPlayerAtPosition(position) === PLAYER.INVALID_PLAYER;
    }

    public updatePlayerAtPosition(player: PLAYER, position: number[]): void {
        this.gameBoard[position[0]][position[1]] = player;
    }

    private _getPlayerAtPosition(position: number[]): PLAYER {
        return this.gameBoard[position[0]][position[1]];
    }

}

export default GameBoardController;
