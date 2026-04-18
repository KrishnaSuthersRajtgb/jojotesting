import 'dotenv/config';
import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};
