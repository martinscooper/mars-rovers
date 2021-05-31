import express, { Express } from 'express';
import path from 'path';
import { roversRouter } from './roversRouter';

const app: Express = express();

app.use(express.json());
app.use('/rovers', roversRouter);
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    return res.status(500).json({
      errorName: err.name,
      message: err.message,
      stack: err.stack || 'no stack defined'
    });
  }
);

export default app;
