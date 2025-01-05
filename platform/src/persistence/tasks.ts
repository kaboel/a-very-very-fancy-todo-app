import { PrismaClient, Task, TaskAssignment } from "@prisma/client"
import { ITaskGetMany, ITaskCreate, ITaskUpdate } from "./__dtos__/tasks.dto"

const prisma = new PrismaClient()

export class TaskPersistence {
  async createTask(data: ITaskCreate): Promise<Task> {
    const {
      title,
      description,
      deadline,
      creatorId,
      patientId,
      assigneeIds,
      resources,
    } = data
    const assingments = assigneeIds?.map((id) => ({ userId: id }))
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        deadline,
        creator: {
          connect: { id: creatorId },
        },
        ...(patientId && {
          patient: {
            connect: { id: patientId },
          },
        }),
        ...(assigneeIds?.length && {
          assignments: {
            create: assingments,
          },
        }),
        ...(resources?.length && {
          resources: {
            create: resources,
          },
        }),
      },
    })
    return newTask
  }

  async getTask(id: string): Promise<Task | Error> {
    const task = await prisma.task.findUnique({ where: { id } })
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }
    return task
  }
  async getTasks({
    search,
    creatorId,
    patientId,
    assignedToMe,
  }: ITaskGetMany): Promise<Task[] | void> {
    try {
      // const searchText = search
      const tasks = await prisma.task.findMany({
        where: {
          ...(search && {
            search,
            mode: "insesitive",
          }),
          OR: [
            {
              ...(creatorId && { creatorId }),
            },
            {
              ...(patientId && { patientId }),
            },
            {
              ...(assignedToMe === "true" && {
                assignments: {
                  some: {
                    userId: creatorId,
                  },
                },
              }),
            },
          ],
        },
        include: {
          assignments: true,
          resources: true,
          patient: true,
        },
      })
      return tasks
    } catch (error: any) {
      console.error(error)
    }
  }

  async updateTask(
    taskId: string,
    data: Partial<ITaskUpdate>
  ): Promise<Task | Error> {
    const {
      title,
      description,
      deadline,
      patientId,
      completed,
      assigneeIds,
      resources,
    } = data
    try {
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          ...(title && { title }),
          ...(description && { description }),
          ...(deadline && { deadline }),
          ...(completed && { completed }),
          ...(patientId && {
            patient: {
              connect: {
                id: patientId,
              },
            },
          }),
          ...(assigneeIds?.length && {
            assignments: {
              deleteMany: {},
              create: assigneeIds?.map((userId) => ({ userId })),
            },
          }),
          ...(resources?.length && {
            resources: {
              set: resources.map((resource) => ({ id: resource.id })),
            },
          }),
        },
        include: {
          assignments: true,
          resources: true,
          patient: true,
        },
      })
      return updatedTask
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async deleteTask(id: string): Promise<{ id: string }> {
    try {
      const deletedTask = await prisma.task.delete({
        where: { id },
        select: { id: true },
      })
      return deletedTask
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }
}
