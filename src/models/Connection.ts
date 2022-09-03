import 'dotenv/config';
import mongoose from 'mongoose';

const options = {
  dbName: 'tractian',
};

const connectToDatabase = (mongoDatabaseURI = process.env.MONGO_URI
  || 'mongodb://localhost:27017/tractian') => mongoose
  .connect(mongoDatabaseURI, options);

export default connectToDatabase;