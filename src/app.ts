import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerFile from '../swagger_output.json';
import 'express-async-errors';
import errorHandler from './middleware/erros/errorHandler';
import asetRoute from './routes/aset';

const app = express();
app.use(cors());
app.use(express.json());
app.use(asetRoute);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler);

export default app;