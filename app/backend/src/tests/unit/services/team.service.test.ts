import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import TeamModel from '../../../database/models/team.model';
import RestError from '../../../error/RestError';
import TeamService from '../../../services/team.service';
import { teams } from '../../mocks/team.mock';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Unit tests for TeamService', () => {
  const model = {
    findAll: sinon.stub(),
    findByPk: sinon.stub(),
  } as unknown as typeof TeamModel;

  const service = new TeamService(model);
  describe('Tests TeamService.getAll', () => {
    it('Should return all teams retrieved by TeamModel', async () => {
      (model.findAll as sinon.SinonStub).resolves(teams);

      const result = await service.getAll();

      expect(result).to.deep.equal(teams);
    });
  });

  describe('Tests TeamService.findById', () => {
    after(() => {
      (model.findByPk as sinon.SinonStub).resetHistory();
    });

    it('Should throw an error when team is not found', async () => {
      (model.findByPk as sinon.SinonStub).resolves(undefined);

      const err = await expect(
        service.findById(2),
      ).to.be.rejectedWith(RestError);
      expect(err.statusCode).to.equal(404);
    });

    it('Should return the team based on the provided id', async () => {
      const team = teams[3];
      const { id } = team;
      (model.findByPk as sinon.SinonStub).resolves(team);

      const result = await service.findById(id);

      expect(model.findByPk).to.have.been.calledWith(id);
      expect(result).to.deep.equal(team);
    });
  });
});
