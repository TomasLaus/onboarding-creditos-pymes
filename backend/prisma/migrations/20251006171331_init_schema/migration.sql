/*
  Warnings:

  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `activationExpires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `activationToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `failedAttempts` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isLocked` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lockUntil` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twoFactorEnabled` on the `User` table. All the data in the column will be lost.
  - Added the required column `legalName` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'OBSERVED', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CreditStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'IN_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'OBSERVED', 'APPROVED', 'REJECTED');

-- DropIndex
DROP INDEX "public"."User_activationToken_key";

-- DropIndex
DROP INDEX "public"."User_companyId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "name",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "altEmail" TEXT,
ADD COLUMN     "legalName" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activationExpires",
DROP COLUMN "activationToken",
DROP COLUMN "companyId",
DROP COLUMN "failedAttempts",
DROP COLUMN "isLocked",
DROP COLUMN "lockUntil",
DROP COLUMN "twoFactorEnabled",
ADD COLUMN     "lockedUntil" TIMESTAMP(3),
ADD COLUMN     "loginAttempts" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Onboarding" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "status" "OnboardingStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditApplication" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "amount" DOUBLE PRECISION,
    "termMonths" INTEGER,
    "status" "CreditStatus" NOT NULL DEFAULT 'DRAFT',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeMB" DOUBLE PRECISION NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "version" INTEGER NOT NULL DEFAULT 1,
    "companyId" TEXT,
    "onboardingId" TEXT,
    "creditId" TEXT,
    "observedReason" TEXT,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "performedById" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" JSONB,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuditLogToCreditApplication" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AuditLogToCreditApplication_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AuditLogToOnboarding" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AuditLogToOnboarding_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Onboarding_companyId_key" ON "Onboarding"("companyId");

-- CreateIndex
CREATE INDEX "_AuditLogToCreditApplication_B_index" ON "_AuditLogToCreditApplication"("B");

-- CreateIndex
CREATE INDEX "_AuditLogToOnboarding_B_index" ON "_AuditLogToOnboarding"("B");

-- AddForeignKey
ALTER TABLE "Onboarding" ADD CONSTRAINT "Onboarding_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Onboarding" ADD CONSTRAINT "Onboarding_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditApplication" ADD CONSTRAINT "CreditApplication_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditApplication" ADD CONSTRAINT "CreditApplication_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "Onboarding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "CreditApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuditLogToCreditApplication" ADD CONSTRAINT "_AuditLogToCreditApplication_A_fkey" FOREIGN KEY ("A") REFERENCES "AuditLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuditLogToCreditApplication" ADD CONSTRAINT "_AuditLogToCreditApplication_B_fkey" FOREIGN KEY ("B") REFERENCES "CreditApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuditLogToOnboarding" ADD CONSTRAINT "_AuditLogToOnboarding_A_fkey" FOREIGN KEY ("A") REFERENCES "AuditLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuditLogToOnboarding" ADD CONSTRAINT "_AuditLogToOnboarding_B_fkey" FOREIGN KEY ("B") REFERENCES "Onboarding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
