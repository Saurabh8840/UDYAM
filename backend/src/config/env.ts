import "dotenv/config";

const must = (key: string): string => {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
};

export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),
  DATABASE_URL: must("DATABASE_URL"),
  // comma-separated list or "*"
  CORS_ORIGIN: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map(s => s.trim())
    : ["*"],
};
