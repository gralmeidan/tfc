import generateToken from '../../../auth/generateToken';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { validAdmin } from '../../mocks/user.mock';
import { expect } from 'chai';
import mockToken from '../../mocks/token.mock';

describe('Unit tests for auth/generateToken', () => {
  it('Should return a token', async () => {
    sinon.stub(jwt, 'sign').resolves(mockToken);

    const token = await generateToken(validAdmin.hiddenPassword);

    expect(token).to.equal(mockToken);
  });

  after(() => {
    (jwt.sign as sinon.SinonStub).restore();
  });
});
