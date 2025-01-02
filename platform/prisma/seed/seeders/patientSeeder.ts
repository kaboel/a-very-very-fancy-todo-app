import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"

async function seedPatient() {
  try {
    const prisma = new PrismaClient()
    const patients = Array.from({ length: 20 }).map(() => {
      const patient = {
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress({ useFullAddress: true }),
      }
      return patient
    })
    await prisma.patient.createMany({
      data: patients,
    })
    console.log("Patient seeded!")
    // Fetch and return patientIds for the next seed
    return (await prisma.patient.findMany({ select: { id: true } })).map(
      (patient) => patient.id
    )
  } catch (error) {
    console.error("Error seeding Patient: ", error)
    throw error
  }
}

export default seedPatient
