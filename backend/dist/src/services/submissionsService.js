import { prisma } from "../lib/prisma.js";
export async function createSubmission(data) {
    return prisma.submission.create({
        data: {
            aadhaarNumber: data.aadhaarNumber,
            ownerName: data.ownerName,
            otp: data.otp,
            panNumber: data.panNumber,
        },
    });
}
//# sourceMappingURL=submissionsService.js.map