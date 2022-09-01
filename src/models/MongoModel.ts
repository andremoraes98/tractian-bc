import { isValidObjectId, Model } from 'mongoose';
import IModel from '../interface/IModel';
import CustomError from '../middleware/erros/CustomError';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(object: T): Promise<T> {
    return this._model.create({ ...object });
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new CustomError('InvalidMongoId', 'O ID inserido não é válido!');
    }
    return this._model.findOne({ _id });
  }
}

export default MongoModel;