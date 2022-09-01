import { isValidObjectId, Model } from 'mongoose';
import IModel from '../interface/IModel';

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
      throw new Error('InvalidMongoId');
    }
    return this._model.findOne({ _id });
  }
}

export default MongoModel;