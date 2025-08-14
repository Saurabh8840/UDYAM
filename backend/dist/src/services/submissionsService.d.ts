import type { SubmissionInput } from "../validation/validate.js";
export declare function createSubmission(data: SubmissionInput): Promise<{
    aadhaarNumber: string;
    ownerName: string;
    otp: string;
    panNumber: string;
    id: string;
    createdAt: Date;
}>;
//# sourceMappingURL=submissionsService.d.ts.map