import StageCellModel from './StageCellModel';

// const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const STAGE = {
    CELL_HEIGHT: 100,
    CELL_WIDTH: 100,
    ROW_CELL_COUNT: 8,
    COLUMN_CELL_COUNT: 8,
};

class StageViewController {
    private _element: SVGElement;
    private _items: StageCellModel[] = [];
    // private _onClickStageCellHandler: (event: UIEvent) => void = this._onClickStageCell.bind(this);

    constructor(element: SVGElement) {
        this._element = element;

        this._init()
            ._createChildren();
    }

    _init(): this {
        return this;
    }

    _createChildren(): this {
        for (let i: number = 0; i <= STAGE.COLUMN_CELL_COUNT; i++) {
            for (let j: number = 0; j <= STAGE.ROW_CELL_COUNT; j++) {
                const stageCellModel: StageCellModel = new StageCellModel(i, j);
                // const stageCell: SVGElement = document.createElementNS(SVG_NAMESPACE, 'rect') as SVGElement;

                // stageCell.setAttributeNS(null, 'x', `${i * STAGE.CELL_WIDTH}`);
                // stageCell.setAttributeNS(null, 'y', `${j * STAGE.CELL_HEIGHT}`);
                // stageCell.setAttributeNS(null, 'height', '100');
                // stageCell.setAttributeNS(null, 'width', '100');
                // stageCell.setAttribute('id', `${i}-${j}`);
                // stageCell.classList.add('stage-cell');

                // stageCell.addEventListener('click', this._onClickStageCellHandler);
                this._element.appendChild(stageCellModel.element);
                this._items.push(stageCellModel);
            }
        }

        return this;
    }

    // _onClickStageCell(event: UIEvent): void {
    //     const element: HTMLElement = event.currentTarget as HTMLElement;
    //     console.log('click', element.id);
    // }
}

export default StageViewController;
