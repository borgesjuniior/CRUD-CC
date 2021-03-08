import express from 'express';
import './shared/database';
import routes from './routes/routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server has started on port: 3333.');
})
