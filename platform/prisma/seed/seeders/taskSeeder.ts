import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"

async function seedTask(userIds: string[], ptntIds: string[]) {
  try {
    const prisma = new PrismaClient()
    const tasks = Array.from({ length: 20 }).map(() => {
      const creatorId = userIds[Math.floor(Math.random() * userIds.length)]
      const patientId = ptntIds[Math.floor(Math.random() * ptntIds.length)]
      const task = {
        title: faker.company.buzzVerb(),
        description: faker.lorem.paragraph(1),
        deadline: faker.date.soon(),
        creatorId,
        patientId,
      }
      return task
    })
    await prisma.task.createMany({
      data: tasks,
    })
    console.log("Task seeded!")
    // Fetch and return tasksIds for the next seed
    return (await prisma.task.findMany({ select: { id: true } })).map(
      (task) => task.id
    )
  } catch (error: any) {
    console.error("Error seeding Task: ", error)
    throw error
  }
}

export default seedTask
