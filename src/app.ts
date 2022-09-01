import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/erros/errorHandler';
import asetRoute from './routes/aset';

const app = express();
app.use(express.json());
app.use(asetRoute);
app.use(errorHandler);

export default app;