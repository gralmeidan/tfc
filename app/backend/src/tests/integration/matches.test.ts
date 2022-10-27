import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../app';
import MatchModel from '../../database/models/match.model';
import matches from '../mocks/match.mock';
import * as jwt from 'jsonwebtoken';
import mockToken from '../mocks/token.mock';

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
  describe('Tests POST /matches', async () => {
    const [match] = matches;

    before(() => {
      sinon
        .stub(MatchModel, 'findByPk')
        .resolves(match as unknown as MatchModel);
      sinon
        .stub(MatchModel, 'create')
        .resolves({ id: match.id } as unknown as MatchModel);
      sinon.stub(jwt, 'verify').resolves({ payload: {} });
    });

    after(() => {
      (MatchModel.findByPk as sinon.SinonStub).restore();
      (MatchModel.create as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Should return all matches with a 200 statusCode', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeam: match.homeTeam,
          homeTeamGoals: match.homeTeamGoals,
          awayTeam: match.awayTeam,
          awayTeamGoals: match.awayTeamGoals,
        })
        .set('Authorization', mockToken);

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(match);
    });
  });
});
