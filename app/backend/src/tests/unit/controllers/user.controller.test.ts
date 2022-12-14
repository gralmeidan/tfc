import * as sinon from 'sinon';
import * as chai from 'chai';
import UserController from '../../../controllers/user.controller';
import UserService from '../../../services/user.service';
import { Request, Response } from 'express';
import * as sinonChai from 'sinon-chai';
import { validAdmin } from '../../mocks/user.mock';

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
      (service.autenticate as sinon.SinonStub).resolves(
        validAdmin.hiddenPassword,
      );

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

  describe('Tests UserController.getOwnRole', () => {
    const controller = new UserController({} as UserService);
    const req = {
      user: validAdmin.hiddenPassword,
    } as unknown as Request;

    const res = {} as Response;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

    it("Should correctly return the calling user's role", async () => {
      await controller.getOwnRole(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        role: validAdmin.hiddenPassword.role,
      });
    });
  });
});
