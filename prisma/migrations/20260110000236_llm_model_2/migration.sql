/*
  Warnings:

  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorite_models" DROP CONSTRAINT "favorite_models_modelId_fkey";

-- DropTable
DROP TABLE "Model";

-- CreateTable
CREATE TABLE "FavoriteModelDTO" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "architecture" TEXT NOT NULL,

    CONSTRAINT "FavoriteModelDTO_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite_models" ADD CONSTRAINT "favorite_models_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "FavoriteModelDTO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
