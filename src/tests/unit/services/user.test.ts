import { expect } from 'chai';
import Sinon from 'sinon';
import { ZodError } from 'zod';
import User from '../../../models/User';
import UserService from '../../../services/User';
import { userMock, userMockId } from '../../mocks/userMock';
import CustomError from '../../../middleware/erros/CustomError';

describe('User Service', () => {
  const userModel = new User();
  const userService = new UserService(userModel);

  before(() => {
    Sinon.stub(userModel, 'create').resolves(userMockId);
    Sinon.stub(userModel, 'readOne')
      .onCall(0).resolves(null)
      .onCall(1).resolves(userMockId);
    Sinon.stub(userModel, 'readAll').resolves([userMockId]);
    Sinon.stub(userModel, 'update').resolves();
    Sinon.stub(userModel, 'destroy').resolves();
    Sinon.stub(userModel, 'readOneWhoUnit')
      .onCall(0).resolves(null)
      .onCall(1).resolves(userMockId);
  });

  after(() => {
    Sinon.restore();
  });

  describe('criando um usuário', () => {
    it('criado com sucesso.', async () => {
      const newAset = await userService.create(userMock);

      expect(newAset).to.be.deep.equal(userMockId);
    });

    it('falha na validação do usuário.', async () => {
      try {
        const newAset = await userService.create({} as any);
  
        expect(newAset).to.be.deep.equal(userMockId);
      } catch(e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('procurando um usuário', () => {
    it('quando o banco não acha o usuário.', async () => {
      try {
        await userService.readOne(userMockId._id);
      } catch(e: any) {
        expect(e).to.be.instanceOf(CustomError);
        expect(e.name).to.be.deep.equal('EntityNotFound');
        expect(e.message).to.be.deep.equal('Nenhum usuário com esse ID foi encontrado.');
      }
    });

    it('quando o id informado não é válido.', async () => {
      try {
        await userService.readOne('falsoId');
      } catch(e: any) {
        expect(e).to.be.instanceOf(CustomError);
        expect(e.name).to.be.deep.equal('InvalidMongoId');
        expect(e.message).to.be.deep.equal('O ID inserido não é válido!');
      }
    });

    it('quando é achado o usuário.', async () => {
      const aset = await userService.readOne(userMockId._id);

      expect(aset).to.be.deep.equal(userMockId);
    });
  });

  describe('procurando todos os usuários', () => {
    it('retornando todos os usuários.', async () => {
      const aset = await userService.readAll();

      expect(aset).to.be.deep.equal([userMockId]);
    });
  });

  describe('editando um usuário', () => {
    it('falha na validação do usuário.', async () => {
      try {
        await userService.update(userMockId._id, {} as any);
      } catch(e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });

    it('quando o id informado não é válido.', async () => {
      try {
        await userService.update('falseId', userMock);
      } catch(e: any) {
        expect(e).to.be.instanceOf(CustomError);
        expect(e.name).to.be.deep.equal('InvalidMongoId');
        expect(e.message).to.be.deep.equal('O ID inserido não é válido!');
      }
    });
  });

  describe('excluindo um usuário', () => {
    it('quando o id informado não é válido.', async () => {
      try {
        await userService.destroy('falsoId');
      } catch(e: any) {
        expect(e).to.be.instanceOf(CustomError);
        expect(e.name).to.be.deep.equal('InvalidMongoId');
        expect(e.message).to.be.deep.equal('O ID inserido não é válido!');
      }
    });
  });

  describe('procurando um usuário pela unidade', () => {
    it('quando o banco não acha o usuário.', async () => {
      try {
        await userService.readOneWhoUnit(userMockId._id);
      } catch(e: any) {
        expect(e).to.be.instanceOf(CustomError);
        expect(e.name).to.be.deep.equal('EntityNotFound');
        expect(e.message).to.be.deep.equal('Nenhum usuário com esse ID foi encontrado.');
      }
    });

    it('quando é achado o usuário.', async () => {
      const aset = await userService.readOneWhoUnit(userMockId._id);

      expect(aset).to.be.deep.equal(userMockId);
    });
  });
});