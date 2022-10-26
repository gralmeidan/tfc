import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import TeamController from '../../../controllers/team.controller';
import TeamService from '../../../services/team.service';
import { teams } from '../../mocks/team.mock';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for TeamController', () => {
  const service = {
    getAll: sinon.stub(),
    findById: sinon.stub(),
  } as unknown as TeamService;
  const controller = new TeamController(service);

  const res = {} as Response;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub();

  after(() => {
    (res.status as sinon.SinonStub).resetHistory();
    (res.json as sinon.SinonStub).resetHistory();
  });

  describe('Tests TeamController.getAll', () => {
    it('Should respond with all retrieved teams and a 200 statusCode', async () => {
      const req = {} as Request;
      (service.getAll as sinon.SinonStub).resolves(teams);

      await controller.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(teams);
    });
  });

  describe('Tests TeamController.findById', () => {
    it('Should respond with the retrieved item and a 200 statusCode', async () => {
      const [team] = teams;
      const { id } = team;
      const req = {
        params: { id: String(id) },
      } as unknown as Request;
      (service.findById as sinon.SinonStub).resolves(team);

      await controller.findById(req, res);

      expect(service.findById).to.have.been.calledWith(id);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(team);
    });
  });
});
