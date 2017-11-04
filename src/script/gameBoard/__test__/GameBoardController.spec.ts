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
});
