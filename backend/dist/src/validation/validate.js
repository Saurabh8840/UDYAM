import { formSchema, normalizeInput } from "./formSchema.js";
const messageFor = (id, label) => {
    switch (id) {
        case "aadhaarNumber": return "Aadhaar number must be exactly 12 digits";
        case "ownerName": return "Name should contain only letters and spaces (3-100 characters)";
        case "otp": return "OTP must be exactly 6 digits";
        case "panNumber": return "PAN format should be like ABCDE1234F";
        default: return `Invalid ${label.toLowerCase()} format`;
    }
};
export const validateSubmission = (payload) => {
    const data = normalizeInput(payload);
    const fields = [...formSchema.step1, ...formSchema.step2];
    const errors = {};
    for (const f of fields) {
        const val = data[f.id];
        if (!val || !String(val).trim()) {
            errors[f.id] = `${f.label} is required`;
            continue;
        }
        const re = new RegExp(f.validation);
        if (!re.test(String(val))) {
            errors[f.id] = messageFor(f.id, f.label);
        }
    }
    return { data: data, errors, valid: Object.keys(errors).length === 0 };
};
//# sourceMappingURL=validate.js.map