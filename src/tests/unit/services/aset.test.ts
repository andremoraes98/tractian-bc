import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import Aset from '../../../models/Aset';
import { asetMock, asetMockId } from '../../mocks/asetMock';
import AsetService from '../../../services/Aset';
import { ZodError } from 'zod';

describe('Aset Service', () => {
  const asetModel = new Aset();
  const asetService = new AsetService(asetModel);

  before(() => {
    Sinon.stub(asetModel, 'create').resolves(asetMockId);
  });

  after(() => {
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
});