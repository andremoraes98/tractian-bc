import Aset from '../../../models/Aset';
import AsetService from '../../../services/Aset';
import AsetController from '../../../controllers/Aset';
import { asetMock, asetMockId } from '../../mocks/asetMock';
import { expect } from 'chai';
import Sinon from 'sinon';
import { Request, Response } from 'express';

describe('Aset Controller', () => {
  const asetModel = new Aset();
  const asetService = new AsetService(asetModel);
  const asetController = new AsetController(asetService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    Sinon.stub(asetService, 'create').resolves(asetMockId);
    Sinon.stub(asetService, 'readOne').resolves(asetMockId);
    Sinon.stub(asetService, 'readAll').resolves([asetMockId]);
    Sinon.stub(asetService, 'update').resolves();
    Sinon.stub(asetService, 'destroy').resolves();
    Sinon.stub(asetService, 'readAllWhoOwner').resolves([asetMockId]);

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('criando um ativo', () => {
    it('criado com sucesso.', async () => {
      req.body = asetMock;
      await asetController.create(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(asetMockId)).to.be.true;
    });
  });

  describe('procurando um ativo', () => {
    it('quando é achado o ativo.', async () => {
      req.params = { id: asetMockId._id };
      await asetController.readOne(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(asetMockId)).to.be.true;
    });
  });

  describe('procurando todos os ativos', () => {
    it('retornando todos os ativos.', async () => {
      await asetController.readAll(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith([asetMockId])).to.be.true;
    });
  });

  describe('editando um ativo', () => {
    it('editado com sucesso.', async () => {
      req.body = asetMock;
      await asetController.update(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
    });
  });

  describe('excluindo um ativo', () => {
    it('excluído com sucesso.', async () => {
      req.body = asetMock;
      await asetController.destroy(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
    });
  });

  describe('procurando todos os ativos pela unidade', () => {
    it('retornando todos os ativos.', async () => {
      await asetController.readAllWhoOwner(req, res);

      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith([asetMockId])).to.be.true;
    });
  });
});