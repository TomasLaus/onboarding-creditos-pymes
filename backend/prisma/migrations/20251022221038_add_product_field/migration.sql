/*
  Warnings:

  - Added the required column `coin` to the `CreditApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `CreditApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `CreditApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlySales` to the `CreditApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `CreditApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoDni` to the `CreditApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditApplication" ADD COLUMN     "coin" TEXT NOT NULL,
ADD COLUMN     "dni" TEXT NOT NULL,
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "monthlySales" TEXT NOT NULL,
ADD COLUMN     "product" TEXT NOT NULL,
ADD COLUMN     "tipoDni" TEXT NOT NULL;
