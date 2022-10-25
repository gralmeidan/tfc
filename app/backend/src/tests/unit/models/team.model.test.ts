import * as chai from 'chai';
import TeamModel from '../../../database/models/team.model';
import Team from '../../../types/team.type';

const { expect } = chai;

describe('Tests if Team.model succesfully connects to the database', () => {
  it('Should return a non-empty array when asked to find all teams', async () => {
    const teams = await TeamModel.findAll();

    expect(teams.length).to.be.greaterThan(0);
  });

  it('Should return objects with all expected keys', async () => {
    const users = (await TeamModel.findAll()) as unknown as {
      dataValues: Team;
    }[];
    const keys = ['id', 'teamName'];

    users.forEach((user) => {
      expect(Object.keys(user.dataValues)).to.eql(keys);
    });
  });
});
