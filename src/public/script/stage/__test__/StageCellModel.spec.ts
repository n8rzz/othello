import 'mocha';
import * as sinon from 'sinon';
import { expect } from 'chai';
import StageCellModel from '../StageCellModel';

const playerMock = 1;
const xMock = 3;
const yMock = 3;
const onClickHandlerSpy = sinon.spy();

describe('StageCellModel', () => {
    it('accepts x, y, player and a function when called to instantiate', () => {
        expect(() => new StageCellModel(xMock, yMock, playerMock, onClickHandlerSpy)).to.not.throw();
    });

    it('.addGamePiece() adds a circle svg element to the DOM', () => {
        const expectedResult = 'mix-playerPiece_playerTwo';
        const model: StageCellModel = new StageCellModel(xMock, yMock, playerMock, onClickHandlerSpy);

        model.addGamePiece(playerMock);

        expect(model.gamePieceElement.classList.contains(expectedResult)).to.be.true;
    });
});
