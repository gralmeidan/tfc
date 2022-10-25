import verifyToken from '../../../auth/verifyToken.middleware';
import mockToken from '../../mocks/token.mock';
import RestError from '../../../error/RestError';
import generateToken from '../../../auth/generateToken';
import { validAdmin } from '../../mocks/user.mock';
import { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import * as Sinon from 'sinon';

describe('Unit tests for auth/verifyToken.middleware', () => {
  const res = {} as Response;
  const next = Sinon.stub() as unknown as NextFunction;
  it('Should throw an error when receiving no token', async () => {
    const req = {
      header: () => undefined,
    } as unknown as Request;

    expect(verifyToken(req, res, next)).to.be.rejectedWith(RestError);
  });

  it('Should throw an error when receiving an invalid token', async () => {
    const req = {
      header: () => mockToken,
    } as unknown as Request;

    expect(verifyToken(req, res, next)).to.be.rejectedWith(RestError);
  });

  it('Should set req.user as the decoded User', async () => {
    const token = generateToken(validAdmin.hiddenPassword);
    const req = {
      header: () => token,
      user: undefined,
    } as unknown as Request;

    verifyToken(req, res, next);

    expect(req.user).to.deep.equal(validAdmin.hiddenPassword);
  });
});
