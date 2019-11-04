import updateValidation from "./registerValidation";
import {InvalidInformation} from "../../errors/validation/invalidInformation";
import productUpdateValidation from "./productUpdateValidation";


describe('ProductUpdateValidation Test', () => {

    let validSchema = {
        productId: 'test',
        name: 'test',
        price: 1,
        description: 'test',
        userId: 'test',
        categoryId: 'test',
        image: 'base64',
        imageType: 'png',
        stock: true
    };

    let emptyField = {
        name: 'test',
        price: 1,
        description: 'test',
        userId: 'test',
        image: 'base64',
        imageType: 'png'
    };

    let typeError = {
        name: 'test',
        price: 1,
        description: 'test',
        userId: 'test',
        categoryId: 11,
        image: 'base64',
        imageType: 'png',
        stock: true
    };

    describe('when a valid body is given', () => {
        const req = {body: validSchema};
        it('should successfully return', function () {
            expect(() => {productUpdateValidation.check(req)}).not.toThrow();
        });
    });

    describe('when a required field is empty', () => {
        const req = {body: emptyField};
        it('should throw an error', function () {
            expect(() => {productUpdateValidation.check(req)}).toThrow();
        });
    });

    describe('when a field is not in correct type', () => {
        const req = {body: typeError};
        it('should throw an error', function () {
            expect(function () {productUpdateValidation.check(req)}).toThrow();
        });
    });
});
