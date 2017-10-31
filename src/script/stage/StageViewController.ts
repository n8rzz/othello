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
    private _onClickCellHandler: (event: UIEvent) => void = this._onClickCell.bind(this);

    constructor(element: SVGElement) {
        this._element = element;
        this._items = new StageCellCollection();

        this._init()
            ._createChildren();
    }

    _init(): this {
        return this;
    }

    _createChildren(): this {
        for (let y: number = 0; y <= STAGE.COLUMN_CELL_COUNT; y++) {
            for (let x: number = 0; x <= STAGE.ROW_CELL_COUNT; x++) {
                const stageCellModel: StageCellModel = new StageCellModel(x, y, this._onClickCellHandler);

                this._element.appendChild(stageCellModel.element);
                this._items.addItem(stageCellModel);
            }
        }

        return this;
    }

    _onClickCell(event: UIEvent): void {
        const target: SVGElement = event.currentTarget as SVGElement;
        const stageCellModel = this._items.findCellById(target.id);

        console.log('++ click', target.id, stageCellModel);
    }
}

export default StageViewController;
