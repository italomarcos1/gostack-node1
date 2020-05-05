import express, { response } from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
  return response.json({ message: 'Hello World!' });
});

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333!');
});
