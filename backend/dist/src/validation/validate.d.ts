export type SubmissionInput = {
    aadhaarNumber: string;
    ownerName: string;
    otp: string;
    panNumber: string;
};
export type ValidationErrorMap = Record<string, string>;
export declare const validateSubmission: (payload: Partial<SubmissionInput>) => {
    data: SubmissionInput;
    errors: ValidationErrorMap;
    valid: boolean;
};
//# sourceMappingURL=validate.d.ts.map