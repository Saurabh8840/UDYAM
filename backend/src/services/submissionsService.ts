import { prisma } from "../lib/prisma.js";
import type { SubmissionInput } from "../validation/validate.js";

export async function createSubmission(data: SubmissionInput) {
  return prisma.submission.create({
    data: {
      aadhaarNumber: data.aadhaarNumber,
      ownerName: data.ownerName,
      otp: data.otp,
      panNumber: data.panNumber,
    },
  });
}
