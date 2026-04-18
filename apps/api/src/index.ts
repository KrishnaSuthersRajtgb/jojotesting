import 'dotenv/config';
import { app } from './app.js';
import { connectDB } from './config/db.js';

const PORT: number = Number(process.env.PORT) || 3001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`[api] Server running on http://localhost:${String(PORT)}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

void startServer();

console.log('DB URL:', process.env.DATABASE_URL);