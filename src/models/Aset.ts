import {
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

  public async update(_id: string, object: IAset): Promise<void> {
    const aset = await this._model.findById(_id);

    if (!aset) {
      throw new CustomError(
        'EntityNotFound',
        'Nenhum ativo com esse ID foi encontrado.',
      );
    }

    aset.name = object.name;
    aset.model = object.model;
    aset.owner = object.owner;
    aset.status = object.status;
    aset.helthLevel = object.helthLevel;
    aset.image = object.image;
    aset.energy = object.energy;
    aset.temp = object.temp;
    aset.vibration = object.vibration;

    await aset.save();
  }
}

export default Aset;