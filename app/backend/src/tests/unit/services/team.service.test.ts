import { expect } from 'chai';
import * as sinon from 'sinon';
import TeamModel from '../../../database/models/team.model';
import TeamService from '../../../services/team.service';
import { teams } from '../../mocks/team.mock';

describe('Unit tests for TeamService', () => {
  const model = {
    findAll: sinon.stub(),
  } as unknown as typeof TeamModel;

  const service = new TeamService(model);
  describe('Testes TeamService.getAll', () => {
    it('Should return all teams retrieved by TeamModel', async () => {
      (model.findAll as sinon.SinonStub).resolves(teams);

      const result = await service.getAll();

      expect(result).to.deep.equal(teams);
    });
  });
});
