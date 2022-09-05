import { expect } from 'chai';
import Sinon from 'sinon';
import { Request, Response } from 'express';
import User from '../../../models/User';
import UserService from '../../../services/User';
import UserController from '../../../controllers/User';
import { userMock, userMockId } from '../../mocks/userMock';

describe('User Controller', () => {
  const userModel = new User();
  const userService = new UserService(userModel);
  const userController = new UserController(userService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    Sinon.stub(userService, 'create').resolves(userMockId);
    Sinon.stub(userService, 'readOne').resolves(userMockId);
    Sinon.stub(userService, 'readAll').resolves([userMockId]);
    Sinon.stub(userService, 'update').resolves();
    Sinon.stub(userService, 'destroy').resolves();

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('criando um usuário', () => {
    it('criado com sucesso.', async () => {
      req.body = userMock;
      await userController.create(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(userMockId)).to.be.true;
    });
  });

  describe('procurando um usuário', () => {
    it('quando é achado o usuário.', async () => {
      req.params = { id: userMockId._id };
      await userController.readOne(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(userMockId)).to.be.true;
    });
  });

  describe('procurando todos os usuários', () => {
    it('retornando todos os usuários.', async () => {
      await userController.readAll(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith([userMockId])).to.be.true;
    });
  });

  describe('editando um usuário', () => {
    it('editado com sucesso.', async () => {
      req.body = userMock;
      await userController.update(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
    });
  });

  describe('excluindo um usuário', () => {
    it('excluído com sucesso.', async () => {
      req.body = userMock;
      await userController.destroy(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
    });
  });
});