var _a, _b;
import "dotenv/config";
const must = (key) => {
    const v = process.env[key];
    if (!v)
        throw new Error(`Missing env var: ${key}`);
    return v;
};
export const ENV = {
    NODE_ENV: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development",
    PORT: Number((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 4000),
    DATABASE_URL: must("DATABASE_URL"),
    // comma-separated list or "*"
    CORS_ORIGIN: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map(s => s.trim())
        : ["*"],
};
