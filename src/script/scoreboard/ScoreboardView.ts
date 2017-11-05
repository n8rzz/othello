import { PLAYER } from '../constants/playerConstants';

const SCOREBOARD_CLASSNAME = {
    IS_ACTIVE_CLASSNAME: 'mix-playerList-item_isActive',
    PLAYER_ONE_VIEW: 'js-scoreboardView-playerOne',
    PLAYER_ONE_SCORE_VIEW: 'js-scoreboardView-playerOne-score',
    PLAYER_TWO_VIEW: 'js-scoreboardView-playerTwo',
    PLAYER_TWO_SCORE_VIEW: 'js-scoreboardView-playerTwo-score',
};

class ScoreboardView {
    private _element: HTMLElement = null;
    private _playerOneElement: HTMLElement = null;
    private _playerOneScoreElement: HTMLElement = null;
    private _playerTwoElement: HTMLElement = null;
    private _playerTwoScoreElement: HTMLElement = null;

    constructor(element: HTMLElement, activePlayer: PLAYER) {
        this._element = element;

        return this._init()
            ._createChildren()
            ._layout(activePlayer);
    }

    public updateViewForActivePlayer(activePlayer: PLAYER): void {
        if (activePlayer === PLAYER.ONE) {
            this._playerOneElement.classList.add(SCOREBOARD_CLASSNAME.IS_ACTIVE_CLASSNAME);
            this._playerTwoElement.classList.remove(SCOREBOARD_CLASSNAME.IS_ACTIVE_CLASSNAME);

            return;
        }

        this._playerOneElement.classList.remove(SCOREBOARD_CLASSNAME.IS_ACTIVE_CLASSNAME);
        this._playerTwoElement.classList.add(SCOREBOARD_CLASSNAME.IS_ACTIVE_CLASSNAME);
    }

    public updateScore(playerOneScore: number, playerTwoScore: number): void {
        this._playerOneScoreElement.textContent = `${playerOneScore}`;
        this._playerTwoScoreElement.textContent = `${playerTwoScore}`;
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        this._playerOneElement = this._element.getElementsByClassName(SCOREBOARD_CLASSNAME.PLAYER_ONE_VIEW)[0] as HTMLElement;
        this._playerOneScoreElement = this._playerOneElement.getElementsByClassName(SCOREBOARD_CLASSNAME.PLAYER_ONE_SCORE_VIEW)[0] as HTMLElement;
        this._playerTwoElement = this._element.getElementsByClassName(SCOREBOARD_CLASSNAME.PLAYER_TWO_VIEW)[0] as HTMLElement;
        this._playerTwoScoreElement = this._playerTwoElement.getElementsByClassName(SCOREBOARD_CLASSNAME.PLAYER_TWO_SCORE_VIEW)[0] as HTMLElement;

        return this;
    }

    private _layout(initialActivePlayer: PLAYER): this {
        this.updateViewForActivePlayer(initialActivePlayer);

        return this;
    }
}

export default ScoreboardView;
