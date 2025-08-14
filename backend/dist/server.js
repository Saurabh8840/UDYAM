var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ENV } from "./config/env.js";
import { createApp } from "./app.js";
import { prisma } from "./lib/prisma.js";
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ✅ Connect to database
            yield prisma.$connect();
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
    });
}
startServer();
