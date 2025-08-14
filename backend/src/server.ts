// backend/src/server.ts
import { ENV } from "./config/env.js";
import { createApp } from "./app.js";
import { prisma } from "./lib/prisma.js";

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to Database");
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }

  try {
    const app = createApp();
    app.listen(ENV.PORT, () => {
      console.log(`🚀 API listening on http://localhost:${ENV.PORT}`);
    });
  } catch (err) {
    // If we ever hit here, it's almost certainly a bad route path
    console.error("Failed to start HTTP server (route/middleware error):", err);
    process.exit(1);
  }
}

startServer();
