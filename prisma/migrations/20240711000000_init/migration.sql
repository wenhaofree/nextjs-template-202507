-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "nickname" VARCHAR(255),
    "avatar_url" VARCHAR(255),
    "locale" VARCHAR(50),
    "signin_type" VARCHAR(50),
    "signin_ip" VARCHAR(255),
    "signin_provider" VARCHAR(50),
    "signin_openid" VARCHAR(255),
    "reset_token" VARCHAR(255),
    "reset_token_expires_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_signin_provider_key" ON "users"("email", "signin_provider");
