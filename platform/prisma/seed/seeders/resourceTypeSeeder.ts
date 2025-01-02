import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"

async function seedResourceType() {
  try {
    const prisma = new PrismaClient()
    const types = Array.from({ length: 10 }).map(() => {
      const type = {
        type: faker.hacker.verb(),
      }
      return type
    })
    await prisma.resourceType.createMany({
      data: types,
    })
    console.log("ResourceType seeded!")
  } catch (error: any) {
    console.log("Error seeding ResourceType: ", error)
    throw error
  }
}

export default seedResourceType
