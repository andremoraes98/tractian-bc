import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/erros/errorHandler';

const app = express();
app.use(errorHandler);

export default app;