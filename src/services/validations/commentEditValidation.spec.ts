import * as Mocks from 'node-mocks-http';
import commentEditValidation from './commentEditValidation';
import {InvalidInformation} from "../../errors/validation/invalidInformation";

describe('Comment Edit Validation Test' , () => {

    describe('check function' , () => {
        let validBody = {
            userId: 'test',
            commentId: '0',
            text:'guzel',
            rating: 5,
            title: 'test'
        };
        let invalidBody = {
            text:'guzel',
            rating: 5
        };
        it('It is executed successfully when request is in true form', () => {
            const req = Mocks.createRequest({body: validBody});
            commentEditValidation.check(req);
            expect(function(){commentEditValidation.check(req)}).not.toThrow();
        });
        it('It throws an error when body is in wrong form', () => {
            const req = Mocks.createRequest({body: invalidBody});
            expect(function(){commentEditValidation.check(req)}).toThrow(new InvalidInformation());
        });
    });

});