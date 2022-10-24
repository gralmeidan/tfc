import * as sinon from 'sinon';
import * as chai from 'chai';
import UserController from '../../../controllers/user.controller';
import UserService from '../../../services/user.service';
import { Request, Response } from 'express';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for UserController', () => {
  describe('Tests UserController.login', () => {
    const service = {
      autenticate: sinon.stub(),
    } as unknown as UserService;
    const controller = new UserController(service);

    const request = {
      body: { username: 'admin', password: '123' },
    } as Request;

    it('Should correctly return the token', async () => {
      (service.autenticate as sinon.SinonStub).resolves(true);

      const res = {} as Response;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await controller.login(request, res);

      expect(res.json).to.have.been.called;

      const [{ token }] = (res.json as sinon.SinonStub).lastCall
        .args;

      expect(res.status).to.have.been.calledWith(200);
      expect(token).to.match(
        /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/,
      );
    });
  });
});
