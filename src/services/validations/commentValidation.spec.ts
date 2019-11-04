import * as Mocks from 'node-mocks-http';
import {InvalidInformation} from "../../errors/validation/invalidInformation";
import commentValidation from "./commentValidation";

describe('Comment Validation Test' , () => {

    describe('check function' , () => {
        let validBody = {
            userId: '0',
            productId: 'araba',
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
            commentValidation.check(req);
        });
        it('It throws an error when body is in wrong form', () => {
            const req = Mocks.createRequest({body: invalidBody});
            expect(function(){commentValidation.check(req)}).toThrow(new InvalidInformation());
        });
    });

});