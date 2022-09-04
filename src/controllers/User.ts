import { Request, Response } from 'express';
import IService from '../interface/IService';
import IUser from '../interface/User';

class UserController {
  private _service: IService<IUser>;

  constructor(service: IService<IUser>) {
    this._service = service;
  }

  public async create(req: Request, res: Response) {
    const user = req.body as IUser;

    const result = await this._service.create(user);

    return res.status(201).json(result);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this._service.readOne(id);

    return res.status(200).json(result);
  }

  public async readAll(req: Request, res: Response) {
    const result = await this._service.readAll();

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body as IUser;

    await this._service.update(id, user);

    return res
      .status(201)
      .json({ message: `O usuário ${user.user} foi atualizado com sucesso.` });
  }

  public async destroy(req: Request, res: Response) {
    const { id } = req.params;

    await this._service.destroy(id);

    return res
      .status(201)
      .json({ message: 'O usuário foi excluído com sucesso.' });
  }
}

export default UserController;