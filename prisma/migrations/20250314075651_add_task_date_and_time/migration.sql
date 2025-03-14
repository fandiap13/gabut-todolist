/*
  Warnings:

  - Added the required column `task_time` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "task_time" TIME NOT NULL,
ALTER COLUMN "task_date" SET DATA TYPE DATE;
