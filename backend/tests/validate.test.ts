import { validateSubmission } from "../src/validation/validate.js";

describe("validateSubmission", () => {
  const base = {
    aadhaarNumber: "123456789012",
    ownerName: "RAVI KUMAR",
    otp: "123456",
    panNumber: "ABCDE1234F",
  };

  it("accepts valid payload", () => {
    const { valid, errors } = validateSubmission(base);
    expect(valid).toBe(true);
    expect(errors).toEqual({});
  });

  it("rejects invalid PAN", () => {
    const payload = { ...base, panNumber: "abc123" };
    const { valid, errors } = validateSubmission(payload);
    expect(valid).toBe(false);
    expect(errors.panNumber).toBeDefined();
  });

  it("rejects missing Aadhaar", () => {
    const { valid, errors } = validateSubmission({ ...base, aadhaarNumber: "" });
    expect(valid).toBe(false);
    expect(errors.aadhaarNumber).toMatch(/required/i);
  });

  it("normalizes PAN to uppercase", () => {
    const payload = { ...base, panNumber: "abcde1234f" };
    const { data, valid } = validateSubmission(payload);
    expect(valid).toBe(true);
    expect(data.panNumber).toBe("ABCDE1234F");
  });
});
