import 'dotenv/config';
import mongoose from 'mongoose';

const options = {
  user: process.env.MONGO_USER || 'user',
  pass: process.env.MONGO_PASSWORD || 'password',
  dbName: process.env.MONGO_DB_NAME || 'tractian',
};

const connectToDatabase = (mongoDatabaseURI = process.env.MONGO_URI
  || 'mongodb://localhost:27017/tractian') => mongoose
  .connect(mongoDatabaseURI, options);

export default connectToDatabase;