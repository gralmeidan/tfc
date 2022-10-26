import MatchModel from '../../../database/models/match.model';
import Match from '../../../types/match.type';
import { expect } from 'chai';

describe('Tests if Match.model succesfully connects to the database', () => {
  it('Should return a non-empty array when asked to find all teams', async () => {
    const teams = await MatchModel.findAll();

    expect(teams.length).to.be.greaterThan(0);
  });

  it('Should return objects with all expected keys', async () => {
    const matches = (await MatchModel.findAll()) as unknown as {
      dataValues: Match;
    }[];

    const keys = [
      'id',
      'homeTeam',
      'homeTeamGoals',
      'awayTeam',
      'awayTeamGoals',
      'inProgress',
    ];

    matches.forEach((match) => {
      expect(Object.keys(match.dataValues)).to.eql(keys);
    });
  });
});
