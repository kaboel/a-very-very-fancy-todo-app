import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"

async function seedTask(userIds: string[], ptntIds: string[]) {
  try {
    const prisma = new PrismaClient()
    const tasks = Array.from({ length: 100 }).map(() => {
      const creatorId = userIds[Math.floor(Math.random() * userIds.length)]
      const patientId = ptntIds[Math.floor(Math.random() * ptntIds.length)]
      const isOverdue = Math.random() < 0.5
      const deadline = isOverdue
        ? faker.date.recent({ days: 365 })
        : faker.date.soon()

      return {
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(1),
        deadline,
        creatorId,
        patientId,
      }
    })
    await prisma.task.createMany({
      data: tasks,
    })
    console.log("Task seeded!")
    return (await prisma.task.findMany({ select: { id: true } })).map(
      (task) => task.id
    )
  } catch (error: any) {
    console.error("Error seeding Task: ", error)
    throw error
  }
}

export default seedTask
