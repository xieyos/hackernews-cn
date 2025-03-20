-- CreateTable
CREATE TABLE "Story" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "titleZh" TEXT,
    "url" TEXT,
    "text" TEXT,
    "textZh" TEXT,
    "by" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "descendants" INTEGER NOT NULL DEFAULT 0,
    "time" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "dead" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "kids" INTEGER[],
    "translated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Story_type_idx" ON "Story"("type");

-- CreateIndex
CREATE INDEX "Story_time_idx" ON "Story"("time");

-- CreateIndex
CREATE INDEX "Story_score_idx" ON "Story"("score");
