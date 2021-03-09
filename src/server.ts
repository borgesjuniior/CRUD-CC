import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import './shared/database';
import routes from './routes/routes';
import AppError from './shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.log(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })

})

app.listen(3333, () => {
  console.log('Server has started on port: 3333.');
})
