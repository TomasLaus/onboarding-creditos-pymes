/*
  Warnings:

  - The `coin` column on the `CreditApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `monthlySales` column on the `CreditApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CreditApplication" DROP COLUMN "coin",
ADD COLUMN     "coin" DOUBLE PRECISION,
DROP COLUMN "monthlySales",
ADD COLUMN     "monthlySales" INTEGER;
