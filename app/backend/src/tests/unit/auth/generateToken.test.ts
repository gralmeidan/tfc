import generateToken from '../../../auth/generateToken';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { validAdmin } from '../../mocks/user.mock';
import { expect } from 'chai';

describe('Unit tests for auth/generateToken', () => {
  it('Should return a token', () => {
    const fakeToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    sinon.stub(jwt, 'sign').resolves(fakeToken);

    const token = generateToken(validAdmin.hiddenPassword);

    expect(token).to.equal(fakeToken);
  });
});
