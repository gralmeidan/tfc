import handleError from '../../../middlewares/handleError.middleware';
import { NextFunction, Request, Response } from 'express';
import RestError from '../../../error/RestError';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for handleError.middleware', () => {
  const req = {} as Request;
  const next = {} as NextFunction;
  const res = {} as Response;

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub();

  before(() => {
    sinon.stub(console, 'log');
  });

  after(() => {
    (console.log as sinon.SinonStub).restore();
  });

  it('Should respond with the correct message when receiving a RestError', async () => {
    const message = 'Invalid password';
    const statusCode = 401;

    await handleError(
      new RestError(statusCode, message),
      req,
      res,
      next,
    );

    expect(res.status).to.have.been.calledWith(statusCode);
    expect(res.json).to.have.been.calledWith({ message });
  });

  it('Should respond with status 500 when receiving non rest Error', async () => {
    const err = new Error('MySQL server crashed');
    const message = 'Something went wrong';
    const statusCode = 500;

    await handleError(err, req, res, next);

    expect(console.log).to.have.been.calledWith(err);
    expect(res.status).to.have.been.calledWith(statusCode);
    expect(res.json).to.have.been.calledWith({ message });
  });
});
