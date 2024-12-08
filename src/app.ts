import cors from "cors";
import express from "express";
import mongoose from "mongoose";
// seed
import seedDatabase from "./seeds/seed";
import dotenv from 'dotenv';

class Service {
  public app: express.Application;

  constructor() {
    // Load environment variables first
    dotenv.config();
    
    const { MONGODB_URI } = process.env;
    
    this.app = express();
    this.initializeApp();
    this.connectDb();
  }

  initializeApp() {
    this.app.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(express.json());
  }

  async connectDb() {
    try {
      const uri = process.env.MONGODB_URI;
      
      // Add validation to check if URI exists
      if (!uri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
      }

      await mongoose.connect(uri);
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}

const service = new Service();

export const app = service.app;
