import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import MatchModel from '../../../database/models/match.model';
import RestError from '../../../error/RestError';
import MatchService from '../../../services/match.service';
import matches from '../../mocks/match.mock';

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;

describe('Unit tests for MatchService', () => {
  const model = {
    findAll: sinon.stub(),
    create: sinon.stub(),
    findByPk: sinon.stub(),
    update: sinon.stub(),
  } as unknown as typeof MatchModel;

  const service = new MatchService(model);
  describe('Tests MatchService.getAll', () => {
    it('Should return all matches retrieved by the model', async () => {
      (model.findAll as sinon.SinonStub).resolves(matches);

      const response = await service.getAll();

      expect(response).to.deep.equal(matches);
    });

    it('Should throw an error when receiving an invalid query', async () => {
      const invalidQuery = {
        inProgress: 'notABoolean',
      } as any;

      const err = await expect(
        service.getAll(invalidQuery),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(422);
    });

    it('Should throw an error receiving a query that returns nothing', async () => {
      (model.findAll as sinon.SinonStub).resolves([]);
      const invalidQuery = {
        inProgress: false,
      } as any;

      const err = await expect(
        service.getAll(invalidQuery),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(404);
    });
  });

  describe('Tests MatchService.create', () => {
    const [match] = matches;
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } =
      match;
    const newMatch = {
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
    };

    it('Should pass the input to sequelize', async () => {
      (model.create as sinon.SinonStub).resolves({ id: match.id });
      (model.findByPk as sinon.SinonStub).resolves(match);

      const response = await service.create(newMatch);

      expect(model.create).to.have.been.calledWith(newMatch);
      expect(model.findByPk).to.have.been.calledWith(match.id);
      expect(response).to.deep.equal(match);
    });

    it('Should return an error when receiving invalid input', async () => {
      const input = {
        ...newMatch,
        homeTeam: 'São Paulo',
      } as any;

      const err = await expect(
        service.create(input),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(422);
    });
  });

  describe('Tests MatchService.update', () => {
    const [match] = matches;
    const changes = {
      inProgress: !match.inProgress,
    };

    it('Should pass the input to sequelize', async () => {
      const changed = { ...match, ...changes };

      (model.update as sinon.SinonStub).resolves([1]);
      (model.findByPk as sinon.SinonStub).resolves(changed);

      const response = await service.update(match.id, changes);

      expect(model.update).to.have.been.calledWith(changes, {
        where: { id: match.id },
      });
      expect(model.findByPk).to.have.been.calledWith(match.id);
      expect(response).to.deep.equal(changed);
    });

    it('Should return an error when receiving invalid input', async () => {
      const input = {
        homeTeam: 'São Paulo',
      } as any;

      const err = await expect(
        service.update(match.id, input),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(422);
    });
  });
});
