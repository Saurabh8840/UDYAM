-- CreateTable
CREATE TABLE "public"."Submission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aadhaarNumber" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Submission_panNumber_idx" ON "public"."Submission"("panNumber");
