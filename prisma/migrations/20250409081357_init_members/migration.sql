-- CreateTable
CREATE TABLE "members" (
    "member_id" SERIAL NOT NULL,
    "member_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_penalized" BOOLEAN NOT NULL DEFAULT false,
    "penalty_due_date" TIMESTAMP(3),

    CONSTRAINT "members_pkey" PRIMARY KEY ("member_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_member_code_key" ON "members"("member_code");
