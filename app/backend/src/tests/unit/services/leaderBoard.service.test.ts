import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import LeaderBoardService from '../../../services/leaderBoard.service';
import MatchModel from '../../../database/models/match.model';
import mockLeaderBoard from '../../mocks/leaderBoard.mock';
import RestError from '../../../error/RestError';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Unit tests for LeaderBoardService', () => {
  const model = {
    findAll: sinon.stub(),
  } as unknown as typeof MatchModel;

  const service = new LeaderBoardService(model);

  afterEach(() => {
    (model.findAll as sinon.SinonStub).reset();
  });

  describe('Tests LeaderBoardService.getByLocation', () => {
    it('Should return a formatted and sorted version of the received data', async () => {
      (model.findAll as sinon.SinonStub).resolves(mockLeaderBoard.fromDb);

      const response = await service.getByLocation();

      expect(response).to.deep.equal(mockLeaderBoard.response);
    });
    it("Should call the correct option set when receiving 'away'", async () => {
      (model.findAll as sinon.SinonStub).resolves(mockLeaderBoard.fromDb);

      await service.getByLocation('away');
      const [{ group }] = (model.findAll as sinon.SinonStub).lastCall.args;

      expect(group).to.equal('away_team');
    });
    it("Should call the correct option set when receiving 'home'", async () => {
      (model.findAll as sinon.SinonStub).resolves(mockLeaderBoard.fromDb);

      await service.getByLocation('home');
      const [{ group }] = (model.findAll as sinon.SinonStub).lastCall.args;

      expect(group).to.equal('home_team');
    });
    it('Should throw an error when receiving any other value', async () => {
      (model.findAll as sinon.SinonStub).resolves(mockLeaderBoard.fromDb);

      const err = await expect(
        service.getByLocation('any' as any),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(422);
    });
  });
  describe('Tests LeaderBoardService.getAll', () => {
    it('Should combine the retrieved data and return it', async () => {
      (model.findAll as sinon.SinonStub).resolves(mockLeaderBoard.fromDb);

      const response = await service.getAll();

      expect(model.findAll).to.have.been.calledTwice;
      expect(response).to.deep.equal(mockLeaderBoard.combined);
    });
  });
});
