-- CreateTable
CREATE TABLE "books" (
    "book_id" SERIAL NOT NULL,
    "book_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("book_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_book_code_key" ON "books"("book_code");
