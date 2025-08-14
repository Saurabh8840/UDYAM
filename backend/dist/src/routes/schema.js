// backend/src/routes/schema.ts
import { Router } from "express";
import { getSchema } from "../lib/schema.js";
const router = Router();
router.get("/schema", (_req, res) => {
    res.json(getSchema());
});
export default router;
//# sourceMappingURL=schema.js.map