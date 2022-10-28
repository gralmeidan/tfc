import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import LeaderBoardController from '../../../controllers/leaderBoard.controller';
import LeaderBoardService from '../../../services/leaderBoard.service';
import mockLeaderBoard from '../../mocks/leaderBoard.mock';

chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for LeaderBoardController', () => {
  const service = {
    getByLocation: sinon.stub(),
    getAll: sinon.stub(),
  } as unknown as LeaderBoardService;

  const controller = new LeaderBoardController(service);

  const res = {} as Response;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub();

  afterEach(() => {
    (res.status as sinon.SinonStub).resetHistory();
    (res.json as sinon.SinonStub).resetHistory();
  });

  describe('Tests LeaderBoardController.getByLocation', () => {
    it('Should pass the request to the service', async () => {
      const req = {
        params: {
          location: 'home',
        },
      } as unknown as Request;
      (service.getByLocation as sinon.SinonStub).resolves(
        mockLeaderBoard.response,
      );

      await controller.getByLocation(req, res);

      expect(service.getByLocation).to.have.been.calledWith('home');
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockLeaderBoard.response);
    });
  });
  describe('Tests LeaderBoardController.getAll', () => {
    it('Should pass response to the user', async () => {
      const req = {} as Request;
      (service.getAll as sinon.SinonStub).resolves(mockLeaderBoard.response);

      await controller.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockLeaderBoard.response);
    });
  });
});
