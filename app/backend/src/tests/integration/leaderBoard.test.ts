import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import MatchModel from '../../database/models/match.model';
import mockLeaderBoard from '../mocks/leaderBoard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the routes in /leaderboard', () => {
  describe('Tests GET /leaderboard/:location', () => {
    before(async () => {
      sinon
        .stub(MatchModel, 'findAll')
        .resolves(mockLeaderBoard.fromDb as unknown as MatchModel[]);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('Should return the retrieved data', async () => {
      const response = await chai.request(app).get('/leaderboard/home');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockLeaderBoard.response);
    });
  });
  describe('Tests GET /leaderboard/', () => {
    before(async () => {
      sinon
        .stub(MatchModel, 'findAll')
        .resolves(mockLeaderBoard.fromDb as unknown as MatchModel[]);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('Should return the retrieved and combined data', async () => {
      const response = await chai.request(app).get('/leaderboard');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockLeaderBoard.combined);
    });
  });
});
