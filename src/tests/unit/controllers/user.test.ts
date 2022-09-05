import { expect } from 'chai';
import Sinon from 'sinon';
import { Request, Response } from 'express';
import User from '../../../models/User';
import UserService from '../../../services/User';
import UserController from '../../../controllers/User';
import { userMock, userMockId } from '../../mocks/userMock';

describe('User Controller', () => {
  const asetModel = new User();
  const asetService = new UserService(asetModel);
  const asetController = new UserController(asetService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    Sinon.stub(asetService, 'create').resolves(userMockId);
    Sinon.stub(asetService, 'readOne').resolves(userMockId);
    Sinon.stub(asetService, 'readOneWhoUnit').resolves(userMockId);
    Sinon.stub(asetService, 'readAll').resolves([userMockId]);
    Sinon.stub(asetService, 'update').resolves();
    Sinon.stub(asetService, 'destroy').resolves();

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('criando um usuário', () => {
    it('criado com sucesso.', async () => {
      req.body = userMock;
      await asetController.create(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(userMockId)).to.be.true;
    });
  });

  describe('procurando um usuário', () => {
    it('quando é achado o usuário.', async () => {
      req.params = { id: userMockId._id };
      await asetController.readOne(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(userMockId)).to.be.true;
    });
  });

  describe('procurando todos os usuários', () => {
    it('retornando todos os usuários.', async () => {
      await asetController.readAll(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith([userMockId])).to.be.true;
    });
  });

  describe('editando um usuário', () => {
    it('editado com sucesso.', async () => {
      req.body = userMock;
      await asetController.update(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
    });
  });

  describe('excluindo um usuário', () => {
    it('excluído com sucesso.', async () => {
      req.body = userMock;
      await asetController.destroy(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
    });
  });

  describe('procurando um usuário pela unidade', () => {
    it('quando é achado o usuário.', async () => {
      req.params = { unit: userMockId.unit };
      await asetController.readOneWhoUnit(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(userMockId)).to.be.true;
    });
  });
});