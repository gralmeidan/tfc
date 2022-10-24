import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import UserModel from '../../database/models/user.model';
import { validAdmin } from '../mocks/user.mock';
import * as jwt from 'jsonwebtoken';
import mockToken from '../mocks/token.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the routes in /login', () => {
  before(async () => {
    sinon
      .stub(UserModel, 'findOne')
      .resolves(validAdmin.fromDb as UserModel);
    sinon.stub(jwt, 'sign').resolves(mockToken);
  });

  after(() => {
    (jwt.sign as sinon.SinonStub).restore();
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('POST /login should return a auth token', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        ...validAdmin.hiddenPassword,
        password: validAdmin.password,
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      token: mockToken,
    });
  });
});
