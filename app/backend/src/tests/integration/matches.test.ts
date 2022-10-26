import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../app';
import MatchModel from '../../database/models/match.model';
import matches from '../mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the routes in /matches', () => {
  describe('Tests GET /matches', async () => {
    before(() => {
      sinon
        .stub(MatchModel, 'findAll')
        .resolves(matches as unknown as MatchModel[]);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('Should return all matches with a 200 statusCode', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matches);
    });
  });
});
