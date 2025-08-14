// backend/src/lib/schema.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PATH = path.resolve(__dirname, "../schema/udyam_schema.json");
const SCHEMA_PATH = process.env.SCHEMA_PATH
    ? path.resolve(process.cwd(), process.env.SCHEMA_PATH)
    : DEFAULT_PATH;
let cached = null;
export function getSchema() {
    if (cached)
        return cached;
    if (!fs.existsSync(SCHEMA_PATH)) {
        throw new Error(`Schema file not found at ${SCHEMA_PATH}`);
    }
    const raw = fs.readFileSync(SCHEMA_PATH, "utf-8");
    cached = JSON.parse(raw);
    return cached;
}
export function getRegex(pattern) {
    try {
        return new RegExp(pattern);
    }
    catch (_a) {
        throw new Error(`Invalid regex pattern: ${pattern}`);
    }
}
export function refreshSchema() {
    cached = null;
}
