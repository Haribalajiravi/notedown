import express from 'express';
const app: express.Application = express();
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRoutes from './routes/user';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use('/user', UserRoutes);

const port: string = process.env.PORT || '3000';
app.listen(port);
// tslint:disable-next-line:no-console
console.log(`Server listening at ${port}`);
