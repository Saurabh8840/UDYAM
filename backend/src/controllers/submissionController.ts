// backend/src/controllers/submissionController.ts
import type { Request, Response, NextFunction } from "express";
import { getSchema, getRegex } from "../lib/schema.js";

export async function submitHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const schema = getSchema();
    const allFields = [...(schema.step1 || []), ...(schema.step2 || [])];

    const errors: Record<string, string> = {};
    for (const f of allFields) {
      const raw = (req.body?.[f.id] ?? "");
      const val = String(raw).trim();

      if (!val) {
        errors[f.id] = `${f.label} is required`;
        continue;
      }

      if (f.validation) {
        const re = getRegex(f.validation);
        if (!re.test(val)) {
          errors[f.id] = `Invalid ${f.label}`;
        }
      }
    }

    if (Object.keys(errors).length) {
      return res.status(400).json({ errors });
    }

   
    return res.status(201).json({ ok: true, message: "Form submitted successfully" });
  } catch (e) {
    next(e);
  }
}
