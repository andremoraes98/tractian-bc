import { model as mongooseCreateModel, Schema } from 'mongoose';
import IUser from '../interface/User';
import CustomError from '../middleware/erros/CustomError';
import MongoModel from './MongoModel';

const userMongooseSchema = new Schema<IUser>({
  user: String,
  unit: String,
});

class User extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }

  public async readAll(): Promise<IUser[]> {
    const users = await this._model.find({}, {
      user: 1,
      unit: 1,
    });

    return users;
  }

  public async readOne(_id: string): Promise<IUser | null> {
    const user = await this._model.findOne({ _id });

    return user;
  }

  public async update(_id: string, object: IUser): Promise<void> {
    const user = await this._model.findById(_id);

    if (!user) {
      throw new CustomError(
        'EntityNotFound',
        'Nenhum usuário com esse ID foi encontrado.',
      );
    }

    user.user = object.user;
    user.unit = object.unit;

    await user.save();
  }

  public async readOneWhoUnit(unit: string): Promise<IUser | null> {
    const user = await this._model.findOne({ unit });

    return user;
  }
}

export default User;