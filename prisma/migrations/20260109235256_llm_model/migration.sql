/*
  Warnings:

  - You are about to drop the column `favorite_models` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "favorite_models";

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "architecture" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_models" (
    "userId" UUID NOT NULL,
    "modelId" TEXT NOT NULL,

    CONSTRAINT "favorite_models_pkey" PRIMARY KEY ("userId","modelId")
);

-- AddForeignKey
ALTER TABLE "favorite_models" ADD CONSTRAINT "favorite_models_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_models" ADD CONSTRAINT "favorite_models_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
