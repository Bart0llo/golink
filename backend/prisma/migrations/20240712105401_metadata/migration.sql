-- CreateEnum
CREATE TYPE "MetadataType" AS ENUM ('website', 'image', 'video');

-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "useMetadata" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Metadata" (
    "id" SERIAL NOT NULL,
    "urlId" INTEGER NOT NULL,
    "type" "MetadataType" NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "color" TEXT,
    "withUrl" TEXT,
    "contentUrl" TEXT,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_urlId_key" ON "Metadata"("urlId");

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
