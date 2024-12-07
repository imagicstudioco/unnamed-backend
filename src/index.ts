import { config } from "dotenv";
// .env
config({ path: `.env.${process.env.NODE_ENV}` });

// app
import { app } from "./app";
// controllers
import { globalErrorController, invalidRoutesController } from "./controllers";
// routes
import { baseAPIURL, indexRoutes } from "./routes";
import campaignRoutes from "./routes/campaignRoutes";
import commentRoutes from "./routes/commentRoutes";
import donationRoutes from "./routes/donationRoutes";
import userRoutes from "./routes/userRoutes";

const { PORT } = process.env;

// Routes
app.use("", indexRoutes);
app.use(`${baseAPIURL}/campaign`, campaignRoutes);
app.use(`${baseAPIURL}/comment`, commentRoutes);
app.use(`${baseAPIURL}/donation`, donationRoutes);
app.use(`${baseAPIURL}/user`, userRoutes);

app.use("*", invalidRoutesController);

app.use(globalErrorController);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
