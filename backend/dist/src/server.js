import { ENV } from "./config/env.js";
import { createApp } from "./app.js";
import { prisma } from "./lib/prisma.js";
async function startServer() {
    try {
        // ✅ Connect to database
        await prisma.$connect();
        console.log("✅ Connected to Database");
    }
    catch (err) {
        console.error("❌ Failed to connect to database:", err);
        process.exit(1);
    }
    try {
        const app = createApp();
        const port = Number(ENV.PORT) || 4000;
        // ✅ Start HTTP server
        app.listen(port, () => {
            console.log(`🚀 API running on http://localhost:${port} (env: ${ENV.NODE_ENV})`);
        });
    }
    catch (err) {
        // If something breaks at app level (bad route, middleware, etc.)
        console.error("❌ Failed to start HTTP server:", err);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map