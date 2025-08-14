// backend/src/routes/submissions.ts
import { Router } from "express";
import { submitHandler } from "../controllers/submissionController.js";
const router = Router();
// Health check
router.get("/health", (_req, res) => res.json({ ok: true }));
// Keep both for safety: FE uses /submissions, tests might use /submit
router.post("/submit", submitHandler);
router.post("/submissions", submitHandler);
export default router;
//# sourceMappingURL=submissions.js.map