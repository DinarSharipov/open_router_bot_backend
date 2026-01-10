/*
  Warnings:

  - The primary key for the `FavoriteModelDTO` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `FavoriteModelDTO` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FavoriteModelDTO" DROP CONSTRAINT "FavoriteModelDTO_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "FavoriteModelDTO_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteModelDTO_userId_id_key" ON "FavoriteModelDTO"("userId", "id");
