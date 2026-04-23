-- CreateEnum
CREATE TYPE "BodyPartGender" AS ENUM ('BOTH', 'FEMALE', 'MALE');

-- AlterTable
ALTER TABLE "BodyPart" ADD COLUMN     "femaleNote" TEXT,
ADD COLUMN     "gender" "BodyPartGender" NOT NULL DEFAULT 'BOTH',
ADD COLUMN     "maleNote" TEXT;
