import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import Aset from '../../../models/Aset';
import { asetMock, asetMockId } from '../../mocks/asetMock';

describe('Aset Model', () => {
  const asetModel = new Aset();

  before(() => {
    Sinon.stub(Model, 'create').resolves(asetMockId);
    Sinon.stub(Model, 'findOne')
      .onCall(0).resolves(asetMockId)
      .onCall(1).resolves(null);
    Sinon.stub(Model, 'find').resolves([asetMockId]);
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
      const aset = await asetModel.readOne('62cf1fc6498565d94eba52cd');

      expect(aset).to.be.deep.equal(asetMockId);
    });

    it('quando o ativo não é achado.', async () => {
      const aset = await asetModel.readOne('wrongId');

      expect(aset).to.be.null;
    });
  });

  describe('procurando todos os ativos', () => {
    it('retornando todos os ativos.', async () => {
      const asets = await asetModel.readAll();

      expect(asets).to.be.deep.equal([asetMockId]);
    });
  });
});