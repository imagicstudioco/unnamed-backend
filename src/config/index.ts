import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-db'; 