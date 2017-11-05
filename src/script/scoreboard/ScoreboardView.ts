import { PLAYER } from '../constants/playerConstants';

const IS_ACTIVE_CLASSNAME = 'mix-playerList-item_isActive';

class ScoreboardView {
    private _element: HTMLElement = null;
    private _playerOneElement: HTMLElement = null;
    private _playerTwoElement: HTMLElement = null;

    constructor(element: HTMLElement, activePlayer: PLAYER) {
        this._element = element;

        return this._init()
            ._createChildren()
            ._layout(activePlayer);
    }

    public updateViewForActivePlayer(activePlayer: PLAYER): void {
        if (activePlayer === PLAYER.ONE) {
            this._playerOneElement.classList.add(IS_ACTIVE_CLASSNAME);
            this._playerTwoElement.classList.remove(IS_ACTIVE_CLASSNAME);

            return;
        }

        this._playerOneElement.classList.remove(IS_ACTIVE_CLASSNAME);
        this._playerTwoElement.classList.add(IS_ACTIVE_CLASSNAME);
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        this._playerOneElement = this._element.getElementsByClassName('js-scoreboardView-playerOne')[0] as HTMLElement;
        this._playerTwoElement = this._element.getElementsByClassName('js-scoreboardView-playerTwo')[0] as HTMLElement;

        return this;
    }

    private _layout(initialActivePlayer: PLAYER): this {
        this.updateViewForActivePlayer(initialActivePlayer);

        return this;
    }
}

export default ScoreboardView;
