import IService from '../interface/IService';
import IAset, { asetSchema } from '../interface/Aset';
import IModel from '../interface/IModel';

class AsetService implements IService<IAset> {
  private _frame: IModel<IAset>;

  constructor(model: IModel<IAset>) {
    this._frame = model;
  }

  public async create(object: IAset): Promise<IAset> {
    const parsed = asetSchema.safeParse(object);

    if (!parsed.success) {
      throw parsed.error;
    }

    const createdAset = this._frame.create(object);

    return createdAset;
  }

  public async readOne(_id: string): Promise<IAset> {
    const aset = await this._frame.readOne(_id);

    if (!aset) {
      throw new Error('EntityNotFound');
    }

    return aset;
  }
}

export default AsetService;