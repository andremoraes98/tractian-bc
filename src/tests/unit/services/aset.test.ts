import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import Aset from '../../../models/Aset';
import { asetMock, asetMockId } from '../../mocks/asetMock';
import AsetService from '../../../services/Aset';
import { ZodError } from 'zod';
import CustomError from '../../../middleware/erros/CustomError';

describe('Aset Service', () => {
  const asetModel = new Aset();
  const asetService = new AsetService(asetModel);

  beforeEach(() => {
    Sinon.stub(asetModel, 'create').resolves(asetMockId);
    Sinon.stub(asetModel, 'readOne')
      .onCall(0).resolves(asetMockId)
      .onCall(1).resolves(null);
    Sinon.stub(asetModel, 'readAll').resolves([asetMockId]);
    Sinon.stub(asetModel, 'update').resolves();
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('criando um ativo', () => {
    it('criado com sucesso.', async () => {
      const newAset = await asetService.create(asetMock);

      expect(newAset).to.be.deep.equal(asetMockId);
    });

    it('falha na validação do ativo.', async () => {
      try {
        const newAset = await asetService.create({} as any);
  
        expect(newAset).to.be.deep.equal(asetMockId);
      } catch(e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('procurando um ativo', () => {
    it('quando é achado o ativo.', async () => {
      const aset = await asetService.readOne(asetMockId._id);

      expect(aset).to.be.deep.equal(asetMockId);
    });

    it('quando o ativo não é achado.', async () => {
      try {
        const aset = await asetService.readOne(asetMockId._id);
      } catch(e: any) {
        expect(e.name).to.be.deep.equal('EntityNotFound');
      }
    });
  });

  describe('procurando todos os ativos', () => {
    it('retornando todos os ativos.', async () => {
      const aset = await asetService.readAll();

      expect(aset).to.be.deep.equal([asetMockId]);
    });
  });

  describe('editando um ativo', () => {
    it('falha na validação do ativo.', async () => {
      try {
        await asetService.update(asetMockId._id, {} as any);
      } catch(e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });

    it('quando o id informado não é válido.', async () => {
      try {
        await asetService.update('falseId', asetMock);
      } catch(e: any) {
        expect(e).to.be.instanceOf(CustomError);
        expect(e.name).to.be.deep.equal('InvalidMongoId');
        expect(e.message).to.be.deep.equal('O ID inserido não é válido!');
      }
    });
  });
});