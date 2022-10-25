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
  describe('Tests POST /login', async () => {
    before(async () => {
      sinon
        .stub(UserModel, 'findOne')
        .resolves(validAdmin.fromDb as unknown as UserModel);
      sinon.stub(jwt, 'sign').resolves(mockToken);
    });

    after(() => {
      (jwt.sign as sinon.SinonStub).restore();
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('Should return an auth token', async () => {
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

  describe('Tests GET /login/validate', async () => {
    before(async () => {
      sinon.stub(jwt, 'verify').returns({
        payload: validAdmin.hiddenPassword,
      } as any);
    });

    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
    });

    it("Should return the calling user's role", async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', mockToken);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        role: validAdmin.hiddenPassword.role,
      });
    });
  });
});
