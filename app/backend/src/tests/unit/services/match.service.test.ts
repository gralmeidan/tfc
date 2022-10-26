import { expect } from 'chai';
import * as sinon from 'sinon';
import MatchModel from '../../../database/models/match.model';
import MatchService from '../../../services/match.service';
import matches from '../../mocks/match.mock';

describe('Unit tests for MatchService', () => {
  const model = {
    findAll: sinon.stub(),
  } as unknown as typeof MatchModel;

  const service = new MatchService(model);
  describe('Tests MatchService.getAll', () => {
    it('Should return all matches retrieved by the model', async () => {
      (model.findAll as sinon.SinonStub).resolves(matches);

      const response = await service.getAll();

      expect(response).to.deep.equal(matches);
    });
  });
});
