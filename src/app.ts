import express from 'express';
import authRoutes from './routes/auth.routes';
import eventoRoutes from './routes/evento.routes';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', eventoRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;