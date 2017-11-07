// tslint:disable trailing-comma
import 'mocha';
import { expect } from 'chai';
import GameBoardController from '../GameBoardController';

describe('GameBoardController', () => {
    it('does not throw when instantiated', () => {
        expect(
            () => new GameBoardController()
        ).to.not.throw();
    });

    it('.isLegalMove() returns true when a gameSquare is empty', () => {
        const mockPosition = [0, 0];
        const controller = new GameBoardController();

        expect(
            controller.isLegalMove(mockPosition)
        ).to.be.true;
    });

    it('.isLegalMove() returns false when a gameSquare is not empty', () => {
        const mockPosition = [3, 3];
        const controller = new GameBoardController();

        expect(
            controller.isLegalMove(mockPosition)
        ).to.be.false;
    });

    it('.isValidPosition() returns false when passed a number < 0', () => {
        const controller = new GameBoardController();

        expect(controller.isValidPosition([-3, 3])).to.be.false;
        expect(controller.isValidPosition([3, -3])).to.be.false;
    });

    it('.isValidPosition() returns false when passed a number > number of columns/rows in gameBoard', () => {
        const controller = new GameBoardController();

        expect(controller.isValidPosition([10, 3])).to.be.false;
        expect(controller.isValidPosition([3, 10])).to.be.false;
    });

    it('.doesCaptureOpposingPlayerPiece() returns false when a given move does not capture at least one opposing piece', () => {
        const positionMock = [1, 1];
        const playerMock = 0;
        const controller = new GameBoardController();

        expect(
            controller.doesCaptureOpposingPlayerPiece(positionMock, playerMock)
        ).to.be.false;
    });

    it('.doesCaptureOpposingPlayerPiece() returns true when a given move will capture at least one opposing piece', () => {
        const positionMock = [1, 1];
        const playerMock = 0;
        const controller = new GameBoardController();
        controller.updatePlayerAtPosition(1, [2, 2]);

        expect(
            controller.doesCaptureOpposingPlayerPiece(positionMock, playerMock)
        ).to.be.true;
    });

    it('.countPiecesForPlayer() returns a number of pieces on the board belonging to a player', () => {
        const controller = new GameBoardController();
        controller.updatePlayerAtPosition(1, [2, 3]);

        expect(controller.countPiecesForPlayer(0)).to.eq(2);
        expect(controller.countPiecesForPlayer(1)).to.eq(4);
    });

    it('.findVectorsToOpposingPlayerPiece() returns an array of vectors to opposing pieces', () => {
        const expectedResult = [[1, 1]];
        const positionMock = [1, 1];
        const playerMock = 0;
        const controller = new GameBoardController();
        controller.updatePlayerAtPosition(1, [2, 2]);

        const result = controller.findVectorsToOpposingPlayerPiece(positionMock, playerMock);

        expect(result).to.deep.eq(expectedResult);
    });

    it('.isCapturePieceAlongVector() returns false when a capture formation is not found', () => {
        const positionMock = [1, 1];
        const vectorMock = [-1, -1];
        const playerMock = 0;
        const controller = new GameBoardController();
        controller.updatePlayerAtPosition(1, [2, 2]);

        const result = controller.isCapturePieceAlongVector(vectorMock, positionMock, playerMock);

        expect(result).to.be.false;
    });

    it('.isCapturePieceAlongVector() returns true when a capture formation is found', () => {
        const positionMock = [1, 1];
        const vectorMock = [1, 1];
        const playerMock = 0;
        const controller = new GameBoardController();
        controller.updatePlayerAtPosition(1, [2, 2]);

        const result = controller.isCapturePieceAlongVector(vectorMock, positionMock, playerMock);

        expect(result).to.be.true;
    });

    it('.updateGameBoardStateForPendingMove() updates gameBoard based on the current move', () => {
        const positionMock = [2, 5];
        const playerMock = 0;
        const controller = new GameBoardController();
        // tslint:disable whitespace
        controller.gameBoard = [
            [-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,0,1,-1,-1,-1],
            [-1,-1,-1,0,1,-1,-1,-1],
            [-1,-1,-1,0,1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1]
        ];
        // tslint:enable whitespace
        controller.doesCaptureOpposingPlayerPiece(positionMock, playerMock);

        controller.updateGameBoardStateForPendingMove(playerMock, positionMock);

        expect(controller.gameBoard[3][4]).to.eq(0);
        expect(controller.gameBoard[2][4]).to.eq(0);
    });

    it('.collectPositionsAlongVectorUntilPlayer() gathers a list of positions that a player has captured and will need to update', () => {
        const expectedResult = [[1, 2], [2, 2], [3, 2]];
        const vectorMock = [1, 0];
        const positionMock = [0, 2];
        const playerMock = 0;
        const controller = new GameBoardController();
        controller.gameBoard[1][2] = 1;
        controller.gameBoard[2][2] = 1;
        controller.gameBoard[3][2] = 1;
        controller.gameBoard[4][2] = 0;

        const result = controller.collectPositionsAlongVectorUntilPlayer(vectorMock, positionMock, playerMock, []);

        expect(result).to.deep.eq(expectedResult);
    });
});
