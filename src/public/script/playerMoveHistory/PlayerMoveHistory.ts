import PlayerMoveModel from './PlayerMoveModel';
import { PLAYER } from '../constants/playerConstants';

class PlayerMoveHistory {
    private _history: PlayerMoveModel[] = [];

    public add(player: PLAYER, position: number[], capturedPieces: number[][]) {
        const playerMoveModel: PlayerMoveModel = new PlayerMoveModel(player, position, capturedPieces);

        this._history.push(playerMoveModel);
    }

    public reset(): void {
        this._history = [];
    }
}

export default PlayerMoveHistory;
