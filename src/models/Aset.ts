import { model as mongooseCreateModel, Schema } from 'mongoose';
import IAset from '../interface/Aset';
import MongoModel from './MongoModel';

const asetMongooseSchema = new Schema<IAset>({
  _id: String,
  name: String,
  model: String,
  owner: String,
  status: String,
  helthLevel: String,
  image: String,
});

class Aset extends MongoModel<IAset> {
  constructor(model = mongooseCreateModel('Aset', asetMongooseSchema)) {
    super(model);
  }
}

export default Aset;