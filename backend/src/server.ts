import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});