import 'mocha';
import { expect } from 'chai';
import { positionToIdTranslator } from '../stageCellTranslators';

describe('.positionToIdTranslator()', () => {

    it('should return a string from passed array value', () => {
        const positionMock = [3, 7];
        const expectedResult = '3-7';
        const result = positionToIdTranslator(positionMock);

        expect(result).to.equal(expectedResult);
    });

});
