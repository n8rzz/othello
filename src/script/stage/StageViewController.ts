import StageCellCollection from './StageCellCollection';
import StageCellModel from './StageCellModel';

const STAGE = {
    CELL_HEIGHT: 100,
    CELL_WIDTH: 100,
    ROW_CELL_COUNT: 8,
    COLUMN_CELL_COUNT: 8,
};

class StageViewController {
    private _element: SVGElement;
    private _items: StageCellCollection = null;
    private _onClickCellHandler: (event: UIEvent) => void

    constructor(element: SVGElement, onClickCellHandler: (event: UIEvent) => void) {
        this._element = element;
        this._items = new StageCellCollection();
        this._onClickCellHandler = onClickCellHandler;

        this._init()
            ._createChildren();
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        for (let y: number = 0; y <= STAGE.COLUMN_CELL_COUNT; y++) {
            for (let x: number = 0; x <= STAGE.ROW_CELL_COUNT; x++) {
                const stageCellModel: StageCellModel = new StageCellModel(x, y, this._onClickCellHandler);

                this._element.appendChild(stageCellModel.element);
                this._items.addItem(stageCellModel);
            }
        }

        return this;
    }

    public togglePlayerInCell(player: number, cellId: string): void {
        const stageCellModel = this._items.findCellById(cellId);

        stageCellModel.addGamePiece(player);
    }
}

export default StageViewController;
