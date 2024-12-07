import cors from "cors";
import express from "express";
import mongoose from "mongoose";
// seed
import seedDatabase from "./seeds/seed";

const { MONGODB_URI } = process.env;

class Service {
  public app: express.Application;

  constructor() {
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

  connectDb() {
    mongoose
      .connect(MONGODB_URI!)
      .then(async () => {
        console.log("Database connected successfully!");
        // Check if seeding is needed (you can add this to your .env)
        if (process.env.SEED_DATABASE === "true") {
          await seedDatabase();
        }
      })
      .catch((err) => console.log(err));
  }
}

const service = new Service();

export const app = service.app;
