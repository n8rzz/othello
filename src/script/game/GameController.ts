import StageViewController from '../stage/StageViewController';

enum PLAYER {
    ONE,
    TWO
}

class GameController {
    public activePlayer: number = 0;

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
        this._stageViewController = new StageViewController(element, this._onClickCellHandler);

        return this;
    }

    public reset(): void {
        // reset board to initial state
    }

    // =====================================================

    public update(cellId: string): void {
        this._playerDidMove(cellId);
    }

    private _playerDidMove(cellId: string): void {
        if (!this._stageViewController.isLegalMoveForPlayerAndCellId(this.activePlayer, cellId)) {
            return;
        }

        this._stageViewController.addPlayerToCell(this.activePlayer, cellId);
        // update surrounding pieces

        this._completeCurrentTurn();
        this._moveToNextTurn();
    }

    private _completeCurrentTurn(): void {
        // identify at least one legal move
    }

    private _moveToNextTurn(): void {
        this._toggleActivePlayer();
    }

    // =====================================================

    private _toggleActivePlayer(): void {
        if (this.activePlayer === PLAYER.ONE) {
            this.activePlayer = PLAYER.TWO;

            return;
        }

        this.activePlayer = PLAYER.ONE;
    }

    private _onClickCell(event: UIEvent): void {
        const target: SVGElement = event.currentTarget as SVGElement;

        this.update(target.id);
    }
}

export default GameController;
