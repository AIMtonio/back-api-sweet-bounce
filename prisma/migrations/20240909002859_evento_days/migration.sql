-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_evento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "days" TEXT DEFAULT '1',
    "date" DATETIME,
    "image" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);
INSERT INTO "new_evento" ("createAt", "date", "days", "description", "id", "image", "name", "updateAt") SELECT "createAt", "date", "days", "description", "id", "image", "name", "updateAt" FROM "evento";
DROP TABLE "evento";
ALTER TABLE "new_evento" RENAME TO "evento";
CREATE UNIQUE INDEX "evento_name_key" ON "evento"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
