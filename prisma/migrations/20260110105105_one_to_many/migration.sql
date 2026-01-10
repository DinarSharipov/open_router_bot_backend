/*
  Warnings:

  - You are about to drop the `favorite_models` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,id]` on the table `FavoriteModelDTO` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `FavoriteModelDTO` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "favorite_models" DROP CONSTRAINT "favorite_models_modelId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_models" DROP CONSTRAINT "favorite_models_userId_fkey";

-- AlterTable
ALTER TABLE "FavoriteModelDTO" ADD COLUMN     "userId" UUID NOT NULL;

-- DropTable
DROP TABLE "favorite_models";

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteModelDTO_userId_id_key" ON "FavoriteModelDTO"("userId", "id");

-- AddForeignKey
ALTER TABLE "FavoriteModelDTO" ADD CONSTRAINT "FavoriteModelDTO_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
