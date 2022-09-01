import 'dotenv/config';
import app from './app';
import connectToDatabase from './models/Connection';

const PORT = process.env.PORT || 3001;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Aplicação rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });