import { isValidObjectId } from 'mongoose';
import IService from '../interface/IService';
import IAset, { asetSchema } from '../interface/Aset';
import IModel from '../interface/IModel';
import CustomError from '../middleware/erros/CustomError';

class AsetService implements IService<IAset> {
  private _aset: IModel<IAset>;

  constructor(model: IModel<IAset>) {
    this._aset = model;
  }

  public async create(object: IAset): Promise<IAset> {
    const parsed = asetSchema.safeParse(object);

    if (!parsed.success) {
      throw parsed.error;
    }

    const createdAset = await this._aset.create(object);

    return createdAset;
  }

  public async readOne(_id: string): Promise<IAset> {
    const aset = await this._aset.readOne(_id);

    if (!aset) {
      throw new CustomError(
        'EntityNotFound',
        'Nenhum ativo com esse ID foi encontrado.',
      );
    }

    return aset;
  }

  public async readAll(): Promise<IAset[]> {
    const result = await this._aset.readAll();

    return result;
  }

  public async update(_id: string, object: IAset): Promise<void> {
    if (!isValidObjectId(_id)) {
      throw new CustomError('InvalidMongoId', 'O ID inserido não é válido!');
    }

    const parsed = asetSchema.safeParse(object);

    if (!parsed.success) {
      throw parsed.error;
    }

    await this._aset.update(_id, object);    
  }
}

export default AsetService;