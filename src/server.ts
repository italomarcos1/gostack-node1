import 'reflect-metadata';
import express, { response } from 'express';
import cors from 'cors';
import routes from './routes';

import './database';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  return response.json({ message: 'Hello World!' });
});

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333!');
});
