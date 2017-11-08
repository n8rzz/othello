import GameBoardController from '../gameBoard/GameBoardController';
import StageViewController from '../stage/StageViewController';
import ScoreboardView from '../scoreboard/ScoreboardView';
import { idToPositionTranslator } from '../translator/stageCellTranslators';
import { PLAYER } from '../constants/playerConstants';

class GameController {
    public activePlayer: number = 0;

    private _gameBoardController: GameBoardController = null;
    private _stageViewController: StageViewController = null;
    private _scoreboardView: ScoreboardView = null;
    private _onClickCellHandler: (event: UIEvent) => void = this._onClickCell.bind(this);

    constructor(scoreboardElement: HTMLElement, stageElement: SVGElement) {
        return this._init()
            ._createChildren(scoreboardElement, stageElement);
    }

    public reset(): void {
        this._gameBoardController.reset();
    }

    // Methods enclosed below are the main game loop methods
    // though there isn't a true game-loop here, these methods are
    // fired once a player clicks on a game cell.
    // each one has a specific purpose and must be run before
    // the start of the next turn.
    // =====================================================

    public update(position: number[], cellId: string): void {
        if (!this._gameBoardController.playerCanMoveToPosition(position, this.activePlayer)) {
            return;
        }

        this._completeTurn(position, cellId);
        this._toggleActivePlayer();
        this._updateScoreboardView();
        this._moveToNextTurn();
    }

    public skipTurn(): void {
        this._toggleActivePlayer();
        this._updateScoreboardView();
        this._moveToNextTurn();
    }

    private _completeTurn(position: number[], cellId: string): void {
        this._gameBoardController.updateGameBoardStateForPendingMove(this.activePlayer, position);
        this._gameBoardController.updatePlayerAtPosition(this.activePlayer, position);
        this._stageViewController.updateWithGameBoardState(this._gameBoardController.gameBoard);
        this._gameBoardController.resetCacheAfterTurn();
    }

    private _moveToNextTurn(): void {
        if (this._gameBoardController.isGameComplete()) {
            return this._completeGame();
        }

        const availableMovesForPlayer: number[][] = this._gameBoardController.collectAvailableMovesForPlayer(this.activePlayer);

        if (availableMovesForPlayer.length === 0) {
            window.alert('No Availalbe Moves, Skipping Turn');

            return this.skipTurn();
        }

        this._stageViewController.updateWithAvailableMoves(availableMovesForPlayer);
    }

    // =====================================================

    private _init(): this {
        return this;
    }

    private _createChildren(scoreboardElement: HTMLElement, stageElement: SVGElement): this {
        this._gameBoardController = new GameBoardController();
        this._stageViewController = new StageViewController(stageElement, this._gameBoardController.gameBoard, this._onClickCellHandler);
        this._scoreboardView = new ScoreboardView(scoreboardElement, this.activePlayer);

        this._updateScoreboardView();
        this._moveToNextTurn();

        return this;
    }

    private _completeGame(): void {
        window.alert('One of you won, probably the one with the most pieces');
    }

    private _countPlayerPeices(player: PLAYER): number {
        return this._gameBoardController.countPiecesForPlayer(player);
    }

    private _toggleActivePlayer(): void {
        if (this.activePlayer === PLAYER.ONE) {
            this.activePlayer = PLAYER.TWO;

            return;
        }

        this.activePlayer = PLAYER.ONE;
    }

    private _updateScoreboardView(): void {
        const playerOneScore = this._gameBoardController.countPiecesForPlayer(PLAYER.ONE);
        const playerTwoScore = this._gameBoardController.countPiecesForPlayer(PLAYER.TWO);

        this._scoreboardView.updateViewForActivePlayer(this.activePlayer);
        this._scoreboardView.updateScore(playerOneScore, playerTwoScore);
    }

    private _onClickCell(event: UIEvent): void {
        const target: SVGElement = event.currentTarget as SVGElement;
        const position: number[] = idToPositionTranslator(target.id);

        this.update(position, target.id);
    }
}

export default GameController;
