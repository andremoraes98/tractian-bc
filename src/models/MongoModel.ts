import { isValidObjectId, Model } from 'mongoose';
import IModel from '../interface/IModel';
import CustomError from '../middleware/erros/CustomError';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(object: T): Promise<T> {
    const createdAset = this._model.create({ ...object });

    return createdAset;
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new CustomError('InvalidMongoId', 'O ID inserido não é válido!');
    }
    const aset = this._model.findOne({ _id });

    return aset;
  }

  public async readAll(): Promise<T[]> {
    const result = this._model.find();

    return result;
  }
}

export default MongoModel;