import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import MatchController from '../../../controllers/match.controller';
import MatchService from '../../../services/match.service';
import matches from '../../mocks/match.mock';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for MatchController', () => {
  const service = {
    getAll: sinon.stub(),
  } as unknown as MatchService;
  const controller = new MatchController(service);

  const res = {} as Response;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub();

  after(() => {
    (res.status as sinon.SinonStub).resetHistory();
    (res.json as sinon.SinonStub).resetHistory();
  });

  describe('Tests MatchController.getAll', () => {
    it('Should respond with all retrieved teams and a 200 statusCode', async () => {
      const req = { query: {} } as Request;
      (service.getAll as sinon.SinonStub).resolves(matches);

      await controller.getAll(req, res);

      expect(service.getAll).to.have.been.calledWithExactly(
        req.query,
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(matches);
    });

    it('Should pass any queries to service', async () => {
      (service.getAll as sinon.SinonStub).resolves(matches);
      const req = {
        query: {
          inProgress: true,
        },
      } as unknown as Request;

      await controller.getAll(req, res);

      expect(service.getAll).to.have.been.calledWithExactly(
        req.query,
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(matches);
    });
  });
});
