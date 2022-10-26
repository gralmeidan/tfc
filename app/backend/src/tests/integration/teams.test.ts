import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import TeamModel from '../../database/models/team.model';
import { validAdmin } from '../mocks/user.mock';
import * as jwt from 'jsonwebtoken';
import mockToken from '../mocks/token.mock';
import { teams } from '../mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the routes in /teams', () => {
  describe('Tests GET /teams', async () => {
    before(() => {
      sinon
        .stub(TeamModel, 'findAll')
        .resolves(teams as TeamModel[]);
    });

    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    });

    it('Should return all teams with a 200 statusCode', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(teams);
    });
  });
  describe('Tests GET /teams/:id', async () => {
    before(() => {
      sinon.stub(TeamModel, 'findByPk');
    });

    after(() => {
      (TeamModel.findByPk as sinon.SinonStub).restore();
    });

    it('Should return the retrieved team', async () => {
      const [team] = teams;
      (TeamModel.findByPk as sinon.SinonStub).resolves(team);

      const response = await chai
        .request(app)
        .get(`/teams/${team.id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(team);
    });
  });
});
