import { Router } from 'express';
import AsetController from '../controllers/Aset';
import AsetModel from '../models/Aset';
import AserService from '../services/Aset';

const route = Router();

const asetModel = new AsetModel();
const asetService = new AserService(asetModel);
const asetController = new AsetController(asetService);

route.get('/aset/:owner', (req, res) => asetController
  .readAllWhoOwner(req, res));
route.get('/aset', (req, res) => asetController.readAll(req, res));
route.put('/aset', (req, res) => asetController.create(req, res));
route.post('/aset/:id', (req, res) => asetController.update(req, res));
route.delete('/aset/:id', (req, res) => asetController.destroy(req, res));

export default route;