import productValidation from "./productValidation";


describe('ProductValidation Test', () => {

    let validSchema = {
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

    describe('when a valid schema is given', () => {
        const req = {body: validSchema};

        it('should successfully return', function () {
            expect(() => {productValidation.check(req)}).not.toThrow();
        });
    });

    describe('when a required field is not given', () => {
        const req = {body: emptyField};
        it('should throw an error', function () {
            expect(() => {productValidation.check(req)}).toThrow();
        });
    });

    describe('when a required field is not in correct type', () => {
        const req = {body: typeError};
        it('should throw an error', function () {
            expect(() => {productValidation.check(req)}).toThrow();
        });
    });

});
