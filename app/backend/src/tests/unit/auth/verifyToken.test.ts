import verifyToken from '../../../auth/verifyToken.middleware';
import mockToken from '../../mocks/token.mock';
import RestError from '../../../error/RestError';
import generateToken from '../../../auth/generateToken';
import { validAdmin } from '../../mocks/user.mock';
import { expect } from 'chai';
import { Request } from 'express';

describe('Unit tests for auth/verifyToken.middleware', () => {
  it('Should throw an error when receiving no token', async () => {
    const req = {
      header: () => undefined,
    } as unknown as Request;

    expect(verifyToken(req)).to.be.rejectedWith(RestError);
  });

  it('Should throw an error when receiving an invalid token', async () => {
    const req = {
      header: () => mockToken,
    } as unknown as Request;

    expect(verifyToken(req)).to.be.rejectedWith(RestError);
  });

  it('Should set req.user as the decoded User', async () => {
    const token = generateToken(validAdmin.hiddenPassword);
    const req = {
      header: () => token,
      user: undefined,
    } as unknown as Request;

    verifyToken(req);

    expect(req.user).to.deep.equal(validAdmin.hiddenPassword);
  });
});
