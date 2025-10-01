import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// API routes
app.use('/api', routes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

export default app;
