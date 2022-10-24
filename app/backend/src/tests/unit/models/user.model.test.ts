import * as chai from 'chai';

import User from '../../../database/models/user.model';

const { expect } = chai;

describe('Tests if User.model succesfully connects to the database', () => {
  it('Should return a non-empty array when asked to find all users', async () => {
    const users = await User.findAll();

    expect(users.length).to.be.greaterThan(0);
  });

  it('Should return objects with all expected keys', async () => {
    const users = (await User.findAll()) as unknown as {
      dataValues: User;
    }[];
    const keys = ['id', 'username', 'role', 'email', 'password'];

    users.forEach((user) => {
      expect(Object.keys(user.dataValues)).to.eql(keys);
    });
  });
});
