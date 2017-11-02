enum PLAYER_PIECE_CLASSNAME {
    'mix-playerPiece_playerOne',
    'mix-playerPiece_playerTwo',
}
const CELL_CLASSNAME = 'stage-cell';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const STAGE = {
    CELL_HEIGHT: 100,
    CELL_WIDTH: 100,
    ROW_CELL_COUNT: 8,
    COLUMN_CELL_COUNT: 8,
};

class StageCellModel {
    private static _count = 0;

    public element: SVGElement = null;
    public gameCellElement: SVGRectElement = null;
    public gamePieceElement: SVGCircleElement = null;
    public id: string = '';
    public isActive: boolean = false;
    public gamePieceRadius: number = -1;
    public height: number = -1;
    public width: number = -1;
    public x: number = -1;
    public y: number = -1;

    private _modelId = StageCellModel._count++;
    private _onClickStageCellHandler: (event: UIEvent) => void;

    constructor(
        x: number,
        y: number,
        onClickHandler: (event: UIEvent) => void,
    ) {
        this.gamePieceRadius = (STAGE.CELL_WIDTH - 10) * 0.5;
        this.height = STAGE.CELL_HEIGHT;
        this.width = STAGE.CELL_WIDTH;
        this.x = x;
        this.y = y;
        this.id = this._buildCellId();
        this._onClickStageCellHandler = onClickHandler;

        this._init()
            ._createChildren()
            ._enable();
    }

    public addGamePiece(currentPlayer: number): void {
        this.isActive = true;
        const playerClassname: string = PLAYER_PIECE_CLASSNAME[currentPlayer];

        this.gamePieceElement.classList.add(playerClassname);
        this.element.appendChild(this.gamePieceElement);
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        this._buildCellElement();
        this._buildGamePieceElement();
        this._buildCellGroupElement();

        return this;
    }

    private _enable(): this {
        this.element.addEventListener('click', this._onClickStageCellHandler);

        return this;
    }

    private _disable(): this {
        this.element.removeEventListener('click', this._onClickStageCellHandler);

        return this._destroy();
    }

    private _destroy(): this {
        this.x = -1;
        this.y = -1;

        return this;
    }

    // public togglePlayer(currentPlayer: number): void {
    //     if (this._hasClass(PLAYER_PIECE_CLASSNAME[0])) {
    //         this.gamePieceElement.classList.remove(PLAYER_PIECE_CLASSNAME[0]);
    //         this.gamePieceElement.classList.add(PLAYER_PIECE_CLASSNAME[1]);

    //         return;
    //     }

    //     this.gamePieceElement.classList.remove(PLAYER_PIECE_CLASSNAME[1]);
    //     this.gamePieceElement.classList.add(PLAYER_PIECE_CLASSNAME[0]);
    // }

    private _buildCellGroupElement(): void {
        this.element = document.createElementNS(SVG_NAMESPACE, 'g');
        this.element.setAttribute('id', this.id);

        this.element.appendChild(this.gameCellElement);
    }

    private _buildCellElement(): void {
        this.gameCellElement = document.createElementNS(SVG_NAMESPACE, 'rect');
        this.gameCellElement.setAttributeNS(null, 'x', `${this._calculateXPosition()}`);
        this.gameCellElement.setAttributeNS(null, 'y', `${this._calculateYPosition()}`);
        this.gameCellElement.setAttributeNS(null, 'height', `${this.height}`);
        this.gameCellElement.setAttributeNS(null, 'width', `${this.width}`);
        this.gameCellElement.classList.add(CELL_CLASSNAME);
    }

    private _buildCellId(): string {
        return `${this.x}-${this.y}`;
    }

    private _buildGamePieceElement(): void {
        this.gamePieceElement = document.createElementNS(SVG_NAMESPACE, 'circle');
        this.gamePieceElement.setAttributeNS(null, 'cx', `${this._calculateXPositionForPlayerPiece()}`);
        this.gamePieceElement.setAttributeNS(null, 'cy', `${this._calculateYPositionForPlayerPiece()}`);
        this.gamePieceElement.setAttributeNS(null, 'r', `${this.gamePieceRadius}`);
        this.gamePieceElement.classList.add('playerPiece');
    }

    private _calculateXPosition(): number {
        return this.x * this.width;
    }

    private _calculateYPosition(): number {
        return this.y * this.height;
    }

    private _calculateXPositionForPlayerPiece(): number {
        return (this.x * this.width) + (this.width * 0.5);
    }

    private _calculateYPositionForPlayerPiece(): number {
        return (this.y * this.height) + (this.height * 0.5);
    }

    private _hasClass(classname: string): boolean {
        return this.gamePieceElement.classList.contains(classname);
    }
}

export default StageCellModel;
