import * as sinon from 'sinon';
import * as chai from 'chai';
import { validAdmin } from '../../mocks/user.mock';
import UserModel from '../../../database/models/user.model';
import UserService from '../../../services/user.service';
import RestError from '../../../error/RestError';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Unit tests for UserService', () => {
  describe('Tests UserService.autenticate', () => {
    const service = new UserService();

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    before(async () => {
      sinon.stub(UserModel, 'findOne');
    });

    it("Should throw an error if email or password aren't passed", async () => {
      (UserModel.findOne as sinon.SinonStub).resolves(null);

      await expect(
        service.autenticate(undefined as any, '123'),
      ).to.be.rejectedWith(RestError);

      await expect(
        service.autenticate('admin', undefined as any),
      ).to.be.rejectedWith(RestError);
    });

    it('Should throw an error if user is not found', async () => {
      (UserModel.findOne as sinon.SinonStub).resolves(null);

      await expect(
        service.autenticate('admin', '123'),
      ).to.be.rejectedWith(RestError);
    });

    it('Should throw an error if password is invalid', async () => {
      (UserModel.findOne as sinon.SinonStub).resolves(
        validAdmin.fromDb,
      );

      await expect(
        service.autenticate('admin', '123'),
      ).to.be.rejectedWith(RestError);
    });

    it('Should return the user if password is valid', async () => {
      (UserModel.findOne as sinon.SinonStub).resolves(
        validAdmin.fromDb,
      );

      const response = await service.autenticate(
        'admin',
        validAdmin.password,
      );

      expect(response).to.deep.equal(validAdmin.hiddenPassword);
    });
  });
});
