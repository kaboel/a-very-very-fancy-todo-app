-- AlterTable
ALTER TABLE "User" ADD COLUMN     "doctorSpecialtyId" TEXT;

-- CreateTable
CREATE TABLE "DoctorSpecialty" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAd" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoctorSpecialty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_doctorSpecialtyId_fkey" FOREIGN KEY ("doctorSpecialtyId") REFERENCES "DoctorSpecialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
