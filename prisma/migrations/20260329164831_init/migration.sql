/*
  Warnings:

  - You are about to drop the column `sickLeave` on the `Employe` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Hr` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hrId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Employe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Hr` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hrId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hr" DROP CONSTRAINT "Hr_companyId_fkey";

-- DropIndex
DROP INDEX "Hr_companyId_key";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "hrId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Employe" DROP COLUMN "sickLeave",
ADD COLUMN     "sickLeaveDays" INTEGER NOT NULL DEFAULT 20,
ALTER COLUMN "surname" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Hr" DROP COLUMN "companyId";

-- AlterTable
ALTER TABLE "SickLeaveRequest" ADD COLUMN     "sickType" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Company_hrId_key" ON "Company"("hrId");

-- CreateIndex
CREATE UNIQUE INDEX "Employe_email_key" ON "Employe"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hr_email_key" ON "Hr"("email");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_hrId_fkey" FOREIGN KEY ("hrId") REFERENCES "Hr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
