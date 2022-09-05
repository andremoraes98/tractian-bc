import { isValidObjectId } from 'mongoose';
import { IServiceAset } from '../interface/IService';
import IAset, { asetSchema } from '../interface/Aset';
import { IModelAsset } from '../interface/IModel';
import CustomError from '../middleware/erros/CustomError';

const InvalidMongoIdMessage = 'O ID inserido não é válido!';

class AsetService implements IServiceAset<IAset> {
  private _aset: IModelAsset<IAset>;

  constructor(model: IModelAsset<IAset>) {
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
    if (!isValidObjectId(_id)) {
      throw new CustomError('InvalidMongoId', InvalidMongoIdMessage);
    }

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
      throw new CustomError('InvalidMongoId', InvalidMongoIdMessage);
    }

    const parsed = asetSchema.safeParse(object);

    if (!parsed.success) {
      throw parsed.error;
    }

    await this._aset.update(_id, object);    
  }

  public async destroy(_id: string): Promise<void> {
    if (!isValidObjectId(_id)) {
      throw new CustomError('InvalidMongoId', InvalidMongoIdMessage);
    }
    await this._aset.destroy(_id);    
  }
  
  public async readAllWhoOwner(owner: string): Promise<IAset[] | []> {
    const result = await this._aset.readAllWhoOwner(owner);

    return result;
  }
}

export default AsetService;