import { PrismaClient } from "@prisma/client"

async function seedTaskAssignment(userIds: string[]) {
  try {
    const prisma = new PrismaClient()
    const tasks = await prisma.task.findMany({
      select: { id: true, creatorId: true },
    })
    const relationships = tasks.flatMap((task) => {
      const nonCreatorIds = userIds.filter(
        (userId) => task.creatorId !== userId
      )
      const numberOfAssignments = Math.floor(Math.random() * 3) + 1
      const assignedUserIds = Array.from(
        new Set(
          Array.from(
            { length: numberOfAssignments },
            () =>
              nonCreatorIds[Math.floor(Math.random() * nonCreatorIds.length)]
          )
        )
      )
      return assignedUserIds.map((userId) => ({
        taskId: task.id,
        userId,
      }))
    })
    await prisma.taskAssignment.createMany({
      data: relationships,
      skipDuplicates: true,
    })
    console.log("TaskAssignment seeded!")
  } catch (error: any) {
    console.error("Error seeding Task Assignment", error)
    throw error
  }
}

export default seedTaskAssignment
