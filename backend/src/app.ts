import express from 'express';
import userRoutes from './routes/user';
//import authRoutes from './routes/auth';
// import errorHandler from './middlewares/errorHandler';
// import notFound from './middlewares/notFound';

const app = express();

app.use(express.json());

// Rutas de usuario y autenticación
app.use('/api/users', userRoutes);



export default app;