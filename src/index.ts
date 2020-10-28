import express from 'express';
const app: express.Application = express();
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRoutes from './routes/user';
import dotEnv from 'dotenv';
dotEnv.config();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGO_DB_URL || 'mongodb://localhost/notedown',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use('/user', UserRoutes);

const port: string = process.env.PORT || '3000';
app.listen(port);
// tslint:disable-next-line:no-console
console.log(`Server listening at ${port}`);
