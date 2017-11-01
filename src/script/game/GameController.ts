import GameBoardController from '../gameBoard/GameBoardController';
import StageViewController from '../stage/StageViewController';
import { idToPositionTranslator } from '../translator/stageCellTranslators';
import { PLAYER } from '../constants/playerConstants';

class GameController {
    public activePlayer: number = 0;

    private _gameBoardController: GameBoardController = null;
    private _stageViewController: StageViewController = null;
    private _onClickCellHandler: (event: UIEvent) => void = this._onClickCell.bind(this);

    constructor(element: SVGElement) {
        return this._init()
            ._createChildren(element);
    }

    private _init(): this {
        return this;
    }

    private _createChildren(element: SVGElement): this {
        this._gameBoardController = new GameBoardController();
        this._stageViewController = new StageViewController(element, this._onClickCellHandler);

        return this;
    }

    public reset(): void {
        this._gameBoardController.reset();
        // this._stageViewController.reset();
    }

    // =====================================================

    public update(position: number[], cellId: string): void {
        this._playerDidMove(position, cellId);
    }

    private _playerDidMove(position: number[], cellId: string): void {
        if (!this._gameBoardController.isLegalMove(position)) {
            return;
        }

        this._gameBoardController.updatePlayerAtPosition(this.activePlayer, position);
        // TODO: read from state and update according
        this._stageViewController.addPlayerToCell(this.activePlayer, cellId);
        // TODO: update surrounding pieces

        this._completeCurrentTurn();
        this._moveToNextTurn();
    }

    private _completeCurrentTurn(): void {
        // identify at least one legal move
    }

    private _moveToNextTurn(): void {
        this._toggleActivePlayer();
        this._updateScoreboardView();
    }

    // =====================================================

    private _toggleActivePlayer(): void {
        if (this.activePlayer === PLAYER.ONE) {
            this.activePlayer = PLAYER.TWO;

            return;
        }

        this.activePlayer = PLAYER.ONE;
    }

    private _updateScoreboardView(): void {
        // update the scoreboard for the next turn
    }

    private _onClickCell(event: UIEvent): void {
        const target: SVGElement = event.currentTarget as SVGElement;
        const position: number[] = idToPositionTranslator(target.id);

        this.update(position, target.id);
    }
}

export default GameController;
