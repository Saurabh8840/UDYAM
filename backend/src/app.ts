// backend/src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { ENV } from "./config/env.js";
import submissionsRoutes from "./routes/submissions.js";
import schemaRoutes from "./routes/schema.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: ENV.CORS_ORIGIN }));
  app.use(express.json({ limit: "256kb" }));
  app.use(morgan(ENV.NODE_ENV === "production" ? "combined" : "dev"));

  // Mount API
  app.use("/api", submissionsRoutes);
  app.use("/api", schemaRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
