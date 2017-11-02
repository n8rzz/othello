import 'mocha';
import { expect } from 'chai';
import { idToPositionTranslator } from '../stageCellTranslators';

describe('.idToPositionTranslator()', () => {

    it('should return an array from passed string value', () => {
        const idMock = '3-7';
        const expectedResult = [3, 7];
        const result = idToPositionTranslator(idMock);

        expect(result[0]).to.equal(expectedResult[0]);
        expect(result[1]).to.equal(expectedResult[1]);
    });

});
