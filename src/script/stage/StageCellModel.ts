const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const STAGE = {
    CELL_HEIGHT: 100,
    CELL_WIDTH: 100,
    ROW_CELL_COUNT: 8,
    COLUMN_CELL_COUNT: 8,
};

class StageCellModel {
    public element: SVGRectElement = null;
    private _onClickStageCellHandler: (event: UIEvent) => void = this._onClickStageCell.bind(this);

    constructor(x: number, y: number) {
        this.element = document.createElementNS(SVG_NAMESPACE, 'rect');
        this.element.setAttributeNS(null, 'x', `${x * STAGE.CELL_WIDTH}`);
        this.element.setAttributeNS(null, 'y', `${y * STAGE.CELL_HEIGHT}`);
        this.element.setAttributeNS(null, 'height', '100');
        this.element.setAttributeNS(null, 'width', '100');
        this.element.setAttribute('id', `${x}-${y}`);
        this.element.classList.add('stage-cell');

        this.element.addEventListener('click', this._onClickStageCellHandler);
    }

    _onClickStageCell(event: UIEvent): void {
        const element: HTMLElement = event.currentTarget as HTMLElement;
        console.log('click', element.id);
    }
}

export default StageCellModel;
