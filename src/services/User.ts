import { isValidObjectId } from 'mongoose';
import IModel from '../interface/IModel';
import IService from '../interface/IService';
import IUser from '../interface/User';
import CustomError from '../middleware/erros/CustomError';

const InvalidMongoIdMessage = 'O ID inserido não é válido!';

class UserService implements IService<IUser> {
  private _user: IModel<IUser>;

  constructor(model: IModel<IUser>) {
    this._user = model;
  }

  public async readAll(): Promise<IUser[]> {
    const users = await this._user.readAll();

    return users;
  }

  public async readOne(_id: string): Promise<IUser> {
    if (!isValidObjectId(_id)) {
      throw new CustomError('InvalidMongoId', InvalidMongoIdMessage);
    }

    const user = await this._user.readOne(_id);

    if (!user) {
      throw new CustomError(
        'EntityNotFound',
        'Nenhum ativo com esse ID foi encontrado.',
      );
    }

    return user;
  }
}

export default UserService;