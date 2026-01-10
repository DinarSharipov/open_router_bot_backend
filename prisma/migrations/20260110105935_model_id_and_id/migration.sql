/*
  Warnings:

  - Added the required column `modelId` to the `FavoriteModelDTO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteModelDTO" ADD COLUMN     "modelId" TEXT NOT NULL;
