/*
  Warnings:

  - You are about to drop the column `resourceTypeId` on the `TaskResource` table. All the data in the column will be lost.
  - You are about to drop the `ResourceType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskResource" DROP CONSTRAINT "TaskResource_resourceTypeId_fkey";

-- AlterTable
ALTER TABLE "TaskResource" DROP COLUMN "resourceTypeId";

-- DropTable
DROP TABLE "ResourceType";
