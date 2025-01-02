import { PrismaClient } from "@prisma/client"
import { USER_ROLES } from "../../../src/helpers/contants"

async function seedPatientOnDoctor(patientIds: string[]) {
  try {
    const prisma = new PrismaClient()
    const doctorIds = (
      await prisma.user.findMany({
        where: { role: USER_ROLES.DOCTOR },
        select: { id: true },
      })
    ).map((doctor) => doctor.id)
    const relationships = patientIds.map((patientId) => {
      const doctorId = doctorIds[Math.floor(Math.random() * doctorIds.length)]
      return {
        doctorId,
        patientId,
      }
    })
    await prisma.patientOnDoctor.createMany({
      data: relationships,
    })
    console.log("PatientOnDoctor seeded!")
  } catch (error: any) {
    console.log("Error seeding Patient-Doctor relationship!", error)
    throw error
  }
}

export default seedPatientOnDoctor
