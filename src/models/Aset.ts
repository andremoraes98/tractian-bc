import {
  isValidObjectId,
  model as mongooseCreateModel,
  Schema,
} from 'mongoose';
import IAset from '../interface/Aset';
import CustomError from '../middleware/erros/CustomError';
import MongoModel from './MongoModel';

const asetMongooseSchema = new Schema<IAset>({
  name: String,
  model: String,
  owner: String,
  status: String,
  helthLevel: String,
  image: String,
  energy: [Number],
  temp: [Number],
  vibration: [Number],
});

class Aset extends MongoModel<IAset> {
  constructor(model = mongooseCreateModel('Aset', asetMongooseSchema)) {
    super(model);
  }

  public async readOne(_id: string): Promise<IAset | null> {
    if (!isValidObjectId(_id)) {
      throw new CustomError('InvalidMongoId', 'O ID inserido não é válido!');
    }

    const aset = this._model.findOne({ _id }, {
      name: 1,
      model: 1,
      owner: 1,
      status: 1,
      helthLevel: 1,
      image: 1,
      energy: 1,
      temp: 1,
      vibration: 1,
    });

    return aset;
  }

  public async readAll(): Promise<IAset[]> {
    const result = await this._model.find({}, {
      name: 1,
      model: 1,
      owner: 1,
      status: 1,
      helthLevel: 1,
      image: 1,
      energy: 1,
      temp: 1,
      vibration: 1,
    });

    return result;
  }
}

export default Aset;