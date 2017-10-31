const CELL_CLASSNAME = 'stage-cell';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const STAGE = {
    CELL_HEIGHT: 100,
    CELL_WIDTH: 100,
    ROW_CELL_COUNT: 8,
    COLUMN_CELL_COUNT: 8,
};

class StageCellModel {
    static _count = 0;

    public element: SVGElement = null;
    public gameCellElement: SVGRectElement = null;
    public gamePieceElement: SVGCircleElement = null;
    public id: string = '';
    public gamePieceRadius: number = STAGE.CELL_WIDTH * 0.5;
    public height: number = STAGE.CELL_HEIGHT;
    public width: number = STAGE.CELL_WIDTH;
    public x: number = -1;
    public y: number = -1;

    private _modelId = StageCellModel._count++;
    private _onClickStageCellHandler: (event: UIEvent) => void;

    constructor(
        x: number,
        y: number,
        onClickHandler: (event: UIEvent) => void
    ) {
        this.x = x;
        this.y = y;
        this.id = this._buildCellId();
        this._onClickStageCellHandler = onClickHandler;

        this._init()
            ._createChildren()
            ._enable();
    }

    _init(): this {
        return this;
    }

    _createChildren(): this {
        this._buildCellElement();
        this._buildGamePieceElement();
        this._buildCellGroupElement();

        return this;
    }

    _enable(): this {
        this.element.addEventListener('click', this._onClickStageCellHandler);

        return this;
    }

    _disable(): this {
        this.element.removeEventListener('click', this._onClickStageCellHandler);

        return this._destroy();
    }

    _destroy(): this {
        this.x = -1;
        this.y = -1;

        return this;
    }

    _buildCellGroupElement(): void {
        this.element = document.createElementNS(SVG_NAMESPACE, 'g');
        this.element.setAttribute('id', this.id);

        this.element.appendChild(this.gameCellElement);
    }

    _buildCellElement(): void {
        this.gameCellElement = document.createElementNS(SVG_NAMESPACE, 'rect');
        this.gameCellElement.setAttributeNS(null, 'x', `${this._calculateXPosition()}`);
        this.gameCellElement.setAttributeNS(null, 'y', `${this._calculateYPosition()}`);
        this.gameCellElement.setAttributeNS(null, 'height', `${this.height}`);
        this.gameCellElement.setAttributeNS(null, 'width', `${this.width}`);
        // this.gameCellElement.setAttribute('id', this.id);
        this.gameCellElement.classList.add(CELL_CLASSNAME);
    }

    _buildCellId(): string {
        return `${this.x}-${this.y}`;
    }

    _buildGamePieceElement(): void {
        this.gamePieceElement = document.createElementNS(SVG_NAMESPACE, 'circle');
        this.gamePieceElement.setAttributeNS(null, 'cx', `${this._calculateXPositionForPlayerPiece()}`);
        this.gamePieceElement.setAttributeNS(null, 'cy', `${this._calculateYPositionForPlayerPiece()}`);
        this.gamePieceElement.setAttributeNS(null, 'r', `${this.gamePieceRadius}`);
        this.gamePieceElement.classList.add('stage-player-piece');
    }

    _calculateXPosition(): number {
        return this.x * STAGE.CELL_WIDTH;
    }

    _calculateYPosition(): number {
        return this.y * STAGE.CELL_HEIGHT;
    }

    _calculateXPositionForPlayerPiece(): number {
        return this.x + (this.width * 0.5);
    }

    _calculateYPositionForPlayerPiece(): number {
        return this.y + (this.height * 0.5);
    }

}

export default StageCellModel;
