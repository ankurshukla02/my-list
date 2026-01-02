import express from 'express';
import myListRoutes from './routes/myList.routes';

export const app = express();

app.use(express.json());

app.use('/my-list', myListRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});
