import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import Aset from '../../../models/Aset';
import { asetMock, asetMockId } from '../../mocks/asetMock';

describe('Aset Model', () => {
  const asetModel = new Aset();

  before(() => {
    Sinon.stub(Model, 'create').resolves(asetMockId);
    Sinon.stub(Model, 'findOne').resolves(asetMockId);
  });

  after(() => {
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
      const newAset = await asetModel.readOne('62cf1fc6498565d94eba52cd');

      expect(newAset).to.be.deep.equal(asetMockId);
    });

    it('id não encontrado.', async () => {
      try {
        const newAset = await asetModel.readOne('falsoId');
  
        expect(newAset).to.be.deep.equal(asetMockId);
      } catch(e: any) {
        expect(e.name).to.be.eq('InvalidMongoId')
      }
    });
  });
});