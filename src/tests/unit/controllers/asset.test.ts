import Aset from '../../../models/Aset';
import AsetService from '../../../services/Aset';
import AsetController from '../../../controllers/Aset';
import { asetMock, asetMockId } from '../../mocks/asetMock';
import { expect } from 'chai';
import Sinon from 'sinon';
import { ZodError } from 'zod';
import { Request, Response } from 'express';

describe('Aset Controller', () => {
  const asetModel = new Aset();
  const asetService = new AsetService(asetModel);
  const asetController = new AsetController(asetService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    Sinon.stub(asetService, 'create').resolves(asetMockId);
    Sinon.stub(asetService, 'readOne').resolves(asetMockId);

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  after(() => {
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
});