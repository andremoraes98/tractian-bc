import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import User from '../../../models/User';
import { userMock, userMockId } from '../../mocks/userMock';
import CustomError from '../../../middleware/erros/CustomError';

describe('User Model', () => {
  const userModel = new User();

  before(() => {
    Sinon.stub(Model, 'create').resolves(userMockId);
    Sinon.stub(Model, 'findOne')
      .onCall(0).resolves(userMockId)
      .onCall(1).resolves(null);
    Sinon.stub(Model, 'find').resolves([userMockId]);
    Sinon.stub(Model, 'findById').resolves(null);
  });

  after(() => {
    Sinon.restore();
  });

  describe('criando um usuário', () => {
    it('criado com sucesso.', async () => {
      const newAset = await userModel.create(userMock);

      expect(newAset).to.be.deep.equal(userMockId);
    });
  });

  describe('procurando um usuário', () => {
    it('achado com sucesso.', async () => {
      const user = await userModel.readOne('62cf1fc6498565d94eba52cd');

      expect(user).to.be.deep.equal(userMockId);
    });

    it('quando o ativo não é achado.', async () => {
      const user = await userModel.readOne('wrongId');

      expect(user).to.be.null;
    });
  });

  describe('procurando todos os usuários', () => {
    it('retornando todos os usuários.', async () => {
      const users = await userModel.readAll();

      expect(users).to.be.deep.equal([userMockId]);
    });
  });

  describe('editando um usuário', () => {
    it('valida se é jogado um erro ao não encontrar o usuário.', async () => {
      try {
        const result = await userModel.update(userMockId._id, userMock);
  
        expect(result).to.be.undefined;
      } catch(e: any) {
        expect(e).to.be.instanceOf(CustomError);
        expect(e.name).to.be.deep.equal('EntityNotFound');
        expect(e.message).to.be.deep.equal('Nenhum usuário com esse ID foi encontrado.');
      }
    })
  });
});