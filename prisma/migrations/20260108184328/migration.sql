-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    "favorite_models" TEXT[],
    "created_date" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
