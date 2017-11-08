import { PLAYER } from '../constants/playerConstants';
import StageCellCollection from './StageCellCollection';
import StageCellModel from './StageCellModel';
import { STAGE } from '../constants/stageConstants';

class StageViewController {
    private _element: SVGElement;
    private _items: StageCellCollection = null;
    private _gameBoardState: number[][] = [[]];
    private _onClickCellHandler: (event: UIEvent) => void;

    constructor(
        element: SVGElement,
        gameBoardState: number[][],
        onClickCellHandler: (event: UIEvent) => void,
    ) {
        this._element = element;
        this._items = new StageCellCollection();
        this._gameBoardState = gameBoardState;
        this._onClickCellHandler = onClickCellHandler;

        this._init()
            ._createChildren();
    }

    public updateWithAvailableMoves(availableMovesForPlayer: number[][]): void {
        for (let i = 0; i < availableMovesForPlayer.length; i++) {
            const cellPosition = availableMovesForPlayer[i];
            const stageCellModel: StageCellModel = this._items.findCellByPosition(cellPosition);

            stageCellModel.addAvailableMoveIndicator();
        }
    }

    public updateWithGameBoardState(gameBoardState: number[][]): void {
        for (let y = 0; y < gameBoardState.length; y++) {
            for (let x = 0; x < gameBoardState[y].length; x++) {
                const player: PLAYER = gameBoardState[y][x];
                const cellPosition: number[] = [y, x];
                const stageCellModel: StageCellModel = this._items.findCellByPosition(cellPosition);

                stageCellModel.removeAvailableMoveIndicator();

                if (player === PLAYER.INVALID_PLAYER) {
                    continue;
                }

                if (!stageCellModel.isActive) {
                    stageCellModel.addGamePiece(player);

                    continue;
                }

                stageCellModel.updateOwner(player);
            }
        }
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        for (let y: number = 0; y < this._gameBoardState.length; y++) {
            for (let x: number = 0; x < this._gameBoardState[0].length; x++) {
                const playerAtCell: PLAYER = this._gameBoardState[y][x];
                const stageCellModel: StageCellModel = new StageCellModel(x, y, playerAtCell, this._onClickCellHandler);

                this._element.appendChild(stageCellModel.element);
                this._items.addItem(stageCellModel);
            }
        }

        return this;
    }
}

export default StageViewController;
