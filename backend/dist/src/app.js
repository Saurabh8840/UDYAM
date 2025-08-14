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
    const allowedOrigins = [
        "http://localhost:5173", // local dev
        ENV.CORS_ORIGIN || "" // from .env for production
    ].filter(Boolean); // remove empty strings
    app.use(helmet());
    app.use(express.json({ limit: "256kb" }));
    app.use(morgan(ENV.NODE_ENV === "production" ? "combined" : "dev"));
    // ✅ CORS setup (support multiple origins)
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "OPTIONS"],
        credentials: false
    }));
    // ✅ Mount routes
    app.use("/api", submissionsRoutes);
    app.use("/api", schemaRoutes);
    // ✅ Error handling
    app.use(notFound);
    app.use(errorHandler);
    return app;
};
//# sourceMappingURL=app.js.map