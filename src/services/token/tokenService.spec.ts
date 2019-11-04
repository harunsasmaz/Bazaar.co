import * as mock from 'node-mocks-http';
import {TokenService} from "./tokenService";
import {NoAccess} from "../../errors/jwt/noAccess";
import {ErrorResponse} from "../../models/response/errorResponse";


function next() {}

describe('TokenService Test', () => {
   let tokenService:TokenService, req, res;

   beforeAll(()=> {
       tokenService = new TokenService();
   });

   describe('checkToken function', () => {

       beforeAll(() => {
          spyOn(tokenService,'checkToken').and.callFake((req,res,next) => {
              try {
                  const header = req.header('Authorization');
                  if(!header){
                      throw new NoAccess();
                  }
                  const headerArr = header.split(' ');
                  if(headerArr.length < 2){
                      throw new NoAccess();
                  }
                  const token = headerArr[1];
                  if( !token ){
                      throw new NoAccess();
                  }

                  const verified = {userId: 'verified'};
                  if(verified.userId !== req.body.userId){
                      throw new NoAccess();
                  }
                  next();
              } catch(err){
                  const errorResponse = new ErrorResponse(new NoAccess());
                  res.status(errorResponse.status).send(errorResponse);
              }
          })
       });

       describe('when user id is correct', () => {
            beforeEach(() => {
                req = mock.createRequest({body: {userId: 'verified'} , headers:{'Authorization': 'Bearer token'}})
                res = mock.createResponse();
            });

           it('should successfully return', function () {
               expect(() => {tokenService.checkToken(req,res,next)}).not.toThrow();
           });
       });

       describe('when header is not Authorization', () => {
           beforeEach(() => {
               req = mock.createRequest({body: {userId: 'verified'} , headers:{'Content-Type': 'Bearer token'}})
               res = mock.createResponse();
           });

           it('should throw No Access error', function () {
               tokenService.checkToken(req,res,next);
               expect(res._getData()).toEqual(new ErrorResponse(new NoAccess()));
           });
       });

       describe('when header value is invalid', () => {
           beforeEach(() => {
               req = mock.createRequest({body: {userId: 'verified'} , headers:{'Authorization': ''}});
               res = mock.createResponse();
           });

           it('should throw No Access error', function () {
               tokenService.checkToken(req,res,next);
               expect(res._getData()).toEqual(new ErrorResponse(new NoAccess()));
           });
       });

       describe('when no token is given', () => {
           beforeEach(() => {
               req = mock.createRequest({body: {userId: 'verified'} , headers:{'Authorization': 'Bearer '}});
               res = mock.createResponse();
           });

           it('should throw No Access error', function () {
               tokenService.checkToken(req,res,next);
               expect(res._getData()).toEqual(new ErrorResponse(new NoAccess()));
           });
       });

       describe('when user id is not correct', () => {
           beforeEach(() => {
               req = mock.createRequest({body: {userId: 'not-correct'} , headers:{'Authorization': 'Bearer token'}});
               res = mock.createResponse();
           });

           it('should throw No Access error', function () {
               tokenService.checkToken(req,res,next);
               expect(res._getData()).toEqual(new ErrorResponse(new NoAccess()));
           });
       });
   });
});
