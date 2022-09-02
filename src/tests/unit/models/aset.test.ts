import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import Aset from '../../../models/Aset';
import { asetMock, asetMockId } from '../../mocks/asetMock';

describe('Aset Model', () => {
  const asetModel = new Aset();

  beforeEach(() => {
    Sinon.stub(Model, 'create').resolves(asetMockId);
    Sinon.stub(Model, 'findOne').resolves(asetMockId);
    Sinon.stub(Model, 'find').resolves([asetMockId]);
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('criando um ativo', () => {
    it('criado com sucesso.', async () => {
      const newAset = await asetModel.create(asetMock);

      expect(newAset).to.be.deep.equal(asetMockId);
    });
  });

  describe('procurando um ativo', () => {
    it('achado com sucesso.', async () => {
      const aset = await asetModel.readOne('62cf1fc6498565d94eba52cd');

      expect(aset).to.be.deep.equal(asetMockId);
    });

    it('id não encontrado.', async () => {
      try {
        const aset = await asetModel.readOne('falsoId');
  
        expect(aset).to.be.deep.equal(asetMockId);
      } catch(e: any) {
        expect(e.name).to.be.eq('InvalidMongoId')
      }
    });
  });

  describe('procurando todos os ativos', () => {
    it('retornando todos os ativos.', async () => {
      const asets = await asetModel.readAll();

      expect(asets).to.be.deep.equal([asetMockId]);
    });
  });
});