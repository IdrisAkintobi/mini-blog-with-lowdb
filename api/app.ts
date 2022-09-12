import cors from 'cors';
import 'dotenv/config.js';
import express, { json, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { ZodError } from 'zod';
import authRoute from './routes/auth.js';
import blogRoute from './routes/blog.js';

const app = express();
app.use(morgan('dev'));
app.use(json());
app.use(cors());

app.get('/', async (req, res) => {
  res.send('ok');
});

app.use('/api/auth', authRoute);
app.use('/api/blog', blogRoute);

// Route not found
app.use((_, res) => {
  res.status(404).json({
    message: 'Page Not Found',
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let message = err.message || 'Something went wrong';
  process.env.NODE_ENV !== 'production' &&
    console.log({ 'Error Stack': err.stack });
  res.status(err.status || 500);
  if (err instanceof ZodError) {
    message = err.flatten();
    res.status(400);
  }
  res.json({ message });
});

export default app;
