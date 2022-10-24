import * as sinon from 'sinon';
import * as chai from 'chai';
import { validAdmin } from '../../mocks/user.mock';
import User from '../../../database/models/user.model';
import UserService from '../../../services/user.service';
import RestError from '../../../error/RestError';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Unit tests for UserService', () => {
  describe('Tests UserService.autenticate', () => {
    const service = new UserService();

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    before(async () => {
      sinon.stub(User, 'findOne');
    });

    it('Should throw an error if user is not found', async () => {
      (User.findOne as sinon.SinonStub).resolves(null);

      await expect(
        service.autenticate('admin', '123'),
      ).to.be.rejectedWith(RestError);
    });

    it('Should return false if password is invalid', async () => {
      (User.findOne as sinon.SinonStub).resolves(validAdmin.fromDb);

      const isValid = await service.autenticate('admin', '123');

      expect(isValid).to.be.false;
    });

    it('Should return true if password is valid', async () => {
      (User.findOne as sinon.SinonStub).resolves(validAdmin.fromDb);

      const isValid = await service.autenticate(
        'admin',
        validAdmin.password,
      );

      expect(isValid).to.be.true;
    });
  });
});
