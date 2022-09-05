import { isValidObjectId } from 'mongoose';
import { IModelUser } from '../interface/IModel';
import IService from '../interface/IService';
import IUser, { userSchema } from '../interface/User';
import CustomError from '../middleware/erros/CustomError';

const InvalidMongoIdMessage = 'O ID inserido não é válido!';

class UserService implements IService<IUser> {
  private _user: IModelUser<IUser>;

  constructor(model: IModelUser<IUser>) {
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
        'Nenhum usuário com esse ID foi encontrado.',
      );
    }

    return user;
  }

  public async create(object: IUser): Promise<IUser> {
    const parsed = userSchema.safeParse(object);

    if (!parsed.success) {
      throw parsed.error;
    }

    const createdAset = await this._user.create(object);

    return createdAset;
  }

  public async update(_id: string, object: IUser): Promise<void> {
    if (!isValidObjectId(_id)) {
      throw new CustomError('InvalidMongoId', InvalidMongoIdMessage);
    }

    const parsed = userSchema.safeParse(object);

    if (!parsed.success) {
      throw parsed.error;
    }

    await this._user.update(_id, object);
  }

  public async destroy(_id: string): Promise<void> {
    if (!isValidObjectId(_id)) {
      throw new CustomError('InvalidMongoId', InvalidMongoIdMessage);
    }
    await this._user.destroy(_id);
  }

  public async readOneWhoUnit(unit: string): Promise<IUser> {
    const user = await this._user.readOneWhoUnit(unit);

    if (!user) {
      throw new CustomError(
        'EntityNotFound',
        'Nenhum usuário com esse ID foi encontrado.',
      );
    }

    return user;
  }
}

export default UserService;