/*
  Warnings:

  - A unique constraint covering the columns `[magyar_par]` on the table `feladatokPair` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `feladatokPair_magyar_par_key` ON `feladatokPair`(`magyar_par`);
