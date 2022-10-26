import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import MatchModel from '../../../database/models/match.model';
import RestError from '../../../error/RestError';
import MatchService from '../../../services/match.service';
import matches from '../../mocks/match.mock';

chai.use(chaiAsPromised);

const { expect } = chai;

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
});
