import { Router } from 'express';
import UserController from '../controllers/User';
import UserService from '../services/User';
import UserModel from '../models/User';

const route = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

route.get('/user/:unit', (req, res) => userController.readOneWhoUnit(req, res));
route.get('/user', (req, res) => userController.readAll(req, res));
route.put('/user', (req, res) => userController.create(req, res));
route.post('/user/:id', (req, res) => userController.update(req, res));
route.delete('/user/:id', (req, res) => userController.destroy(req, res));

export default route;