import request from "supertest";
// mock the service so tests don't require a real DB
jest.mock("../src/services/submissionsService.js", () => ({
    createSubmission: jest.fn().mockResolvedValue({
        id: "test-id",
        createdAt: new Date().toISOString(),
        panNumber: "ABCDE1234F",
    })
}));
const { createApp } = await import("../src/app.js");
const app = createApp();
describe("POST /api/submit", () => {
    it("returns 400 for invalid data (bad PAN)", async () => {
        const res = await request(app)
            .post("/api/submit")
            .send({
            aadhaarNumber: "123456789012",
            ownerName: "RAHUL",
            otp: "123456",
            panNumber: "wrongPAN"
        });
        expect(res.status).toBe(400);
        expect(res.body.errors.panNumber).toBeDefined();
    });
    it("returns 201 for valid data", async () => {
        const res = await request(app)
            .post("/api/submit")
            .send({
            aadhaarNumber: "123456789012",
            ownerName: "RAHUL SHARMA",
            otp: "654321",
            panNumber: "ABCDE1234F"
        });
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.panLast4).toBe("1234");
    });
});
//# sourceMappingURL=api.test.js.map