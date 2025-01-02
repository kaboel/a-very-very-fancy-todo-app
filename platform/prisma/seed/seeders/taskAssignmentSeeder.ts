import { PrismaClient } from "@prisma/client"

async function seedTaskAssignment(userIds: string[]) {
  try {
    const prisma = new PrismaClient()
    const tasks = await prisma.task.findMany({
      select: { id: true, creatorId: true },
    })
    const relationships = tasks.map((task) => {
      const nonCreatorIds = userIds.filter(
        (userId) => task.creatorId !== userId
      )
      const userId =
        nonCreatorIds[Math.floor(Math.random() * nonCreatorIds.length)]
      return {
        taskId: task.id,
        userId,
      }
    })
    await prisma.taskAssignment.createMany({
      data: relationships,
    })
    console.log("TaskAssignment seeded!")
  } catch (error: any) {
    console.error("Error seeding Task Assignment", error)
    throw error
  }
}

export default seedTaskAssignment
