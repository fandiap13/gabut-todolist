/*
  Warnings:

  - You are about to drop the column `status_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_status_id_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status_id",
ADD COLUMN     "status" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Status";
