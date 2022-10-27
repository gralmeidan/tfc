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
    create: sinon.stub(),
    update: sinon.stub(),
  } as unknown as MatchService;
  const controller = new MatchController(service);

  const res = {} as Response;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub();

  afterEach(() => {
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

  describe('Tests MatchController.create', () => {
    it('Should respond with the newly added match', async () => {
      const [match] = matches;
      const req = {
        body: {
          homeTeam: match.homeTeam,
          homeTeamGoals: match.homeTeamGoals,
          awayTeam: match.awayTeam,
          awayTeamGoals: match.awayTeamGoals,
        },
      } as Request;
      (service.create as sinon.SinonStub).resolves(match);

      await controller.create(req, res);

      expect(service.create).to.have.been.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(match);
    });
  });

  describe('Tests MatchController.finishMatch', () => {
    it('Should return a success message', async () => {
      const [match] = matches;
      const req = {
        params: { id: match.id },
      } as unknown as Request;
      (service.update as sinon.SinonStub).resolves({
        ...match,
        inProgress: false,
      });

      await controller.finishMatch(req, res);

      expect(service.update).to.have.been.calledWith(match.id, {
        inProgress: false,
      });
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        message: 'Finished',
      });
    });
  });

  describe('Tests MatchController.update', () => {
    it('Should respond with the updated match', async () => {
      const [match] = matches;
      const req = {
        params: { id: String(match.id) },
        body: {
          homeTeamGoals: 1,
          awayTeamGoals: 7,
        },
      } as unknown as Request;
      (service.update as sinon.SinonStub).resolves({
        ...match,
        ...req.body,
      });

      await controller.update(req, res);

      expect(service.update).to.have.been.calledWith(
        match.id,
        req.body,
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        ...match,
        ...req.body,
      });
    });
  });
});
