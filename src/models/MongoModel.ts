import { Model } from 'mongoose';
import IModel from '../interface/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(object: T): Promise<T> {
    const createdAset = this._model.create({ ...object });

    return createdAset;
  }

  abstract readOne(_id: string): Promise<T | null>;

  abstract readAll(): Promise<T[]>;

  abstract update(_id: string, object: T): Promise<void>;

  public async destroy(_id: string): Promise<void> {
    await this._model.deleteOne({ _id });
  }
}

export default MongoModel;