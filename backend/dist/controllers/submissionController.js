var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getSchema, getRegex } from "../lib/schema.js";
export function submitHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const schema = getSchema();
            const allFields = [...(schema.step1 || []), ...(schema.step2 || [])];
            const errors = {};
            for (const f of allFields) {
                const raw = ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a[f.id]) !== null && _b !== void 0 ? _b : "");
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
        }
        catch (e) {
            next(e);
        }
    });
}
