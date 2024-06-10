/*
  Warnings:

  - You are about to drop the column `createAt` on the `reply` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reply" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "replyContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "reply_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_reply" ("id", "postId", "replyContent") SELECT "id", "postId", "replyContent" FROM "reply";
DROP TABLE "reply";
ALTER TABLE "new_reply" RENAME TO "reply";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
