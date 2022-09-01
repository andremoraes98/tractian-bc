import { Request, Response } from 'express';
import IService from '../interface/IService';
import IAset from '../interface/Aset';

class AsetController {
  private _service: IService<IAset>;

  constructor(service: IService<IAset>) {
    this._service = service;
  }

  public async create(req: Request, res: Response) {
    const aset = req.body as IAset;

    const result = await this._service.create(aset);

    return res.status(201).json(result);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this._service.readOne(id);

    return res.status(200).json(result);
  }
}

export default AsetController;