import { PrismaClient, DoctorSpecialty } from "@prisma/client"

const prisma = new PrismaClient()

export default class Specialty {
  async getSpecialty(title: string): Promise<DoctorSpecialty | null> {
    let specialty = await prisma.doctorSpecialty.findFirst({
      where: { title },
    })

    if (!specialty) {
      specialty = await prisma.doctorSpecialty.create({
        data: {
          title,
        },
      })
    }

    return specialty
  }
}
