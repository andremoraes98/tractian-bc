import { Router } from 'express';
import AsetController from '../controllers/Aset';
import AsetModel from '../models/Aset';
import AserService from '../services/Aset';

const route = Router();

const asetModel = new AsetModel();
const asetService = new AserService(asetModel);
const asetController = new AsetController(asetService);

route.get('/aset/:id', (req, res) => asetController.readOne(req, res));
route.get('/aset', (req, res) => asetController.readAll(req, res));
route.post('/aset', (req, res) => asetController.create(req, res));

export default route;