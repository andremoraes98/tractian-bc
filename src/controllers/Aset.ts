import { Request, Response } from 'express';
import { IServiceAset } from '../interface/IService';
import IAset from '../interface/Aset';

class AsetController {
  private _service: IServiceAset<IAset>;

  constructor(service: IServiceAset<IAset>) {
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

  public async readAll(_req: Request, res: Response) {
    const result = await this._service.readAll();

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const aset = req.body as IAset;

    await this._service.update(id, aset);

    return res
      .status(201)
      .json({ message: `O ativo ${aset.name} foi atualizado com sucesso.` });
  }

  public async destroy(req: Request, res: Response) {
    const { id } = req.params;

    await this._service.destroy(id);

    return res
      .status(201)
      .json({ message: 'O ativo foi excluído com sucesso.' });
  }

  public async readAllWhoOwner(req: Request, res: Response) {
    const { owner } = req.params;

    const result = await this._service.readAllWhoOwner(owner);

    return res.status(200).json(result);
  }
}

export default AsetController;