import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../app';
import MatchModel from '../../database/models/match.model';
import matches from '../mocks/match.mock';
import * as jwt from 'jsonwebtoken';
import mockToken from '../mocks/token.mock';
import TeamModel from '../../database/models/team.model';
import { teams } from '../mocks/team.mock';

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

  describe('Tests PATCH /matches/:id/finish', async () => {
    const [match] = matches;

    before(() => {
      sinon
        .stub(MatchModel, 'findByPk')
        .resolves(match as unknown as MatchModel);
      sinon.stub(TeamModel, 'findByPk').resolves(teams[0] as any);
      sinon.stub(MatchModel, 'update').resolves([1] as any);
      sinon.stub(jwt, 'verify').resolves({ payload: {} });
    });

    after(() => {
      (MatchModel.findByPk as sinon.SinonStub).restore();
      (MatchModel.update as sinon.SinonStub).restore();
      (TeamModel.findByPk as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Should return a successful message with a 200 status', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${match.id}/finish`)
        .set('Authorization', mockToken);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        message: 'Finished',
      });
    });
  });

  describe('Tests PATCH /matches/:id', async () => {
    const [match] = matches;
    const changes = {
      homeTeamGoals: 1,
      awayTeamGoals: 7,
    };

    before(() => {
      sinon.stub(MatchModel, 'findByPk');
      sinon.stub(TeamModel, 'findByPk').resolves(teams[0] as any);
      sinon.stub(MatchModel, 'update').resolves([1] as any);
      sinon.stub(jwt, 'verify').resolves({ payload: {} });
    });

    after(() => {
      (MatchModel.findByPk as sinon.SinonStub).restore();
      (MatchModel.update as sinon.SinonStub).restore();
      (TeamModel.findByPk as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Should return the updated match with a 200 statusCode', async () => {
      (MatchModel.findByPk as sinon.SinonStub).resolves({
        ...match,
        ...changes,
      });

      const response = await chai
        .request(app)
        .patch(`/matches/${match.id}`)
        .set('Authorization', mockToken)
        .send(changes);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        ...match,
        ...changes,
      });
    });
  });
});
