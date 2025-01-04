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
        patient: {
          connect: { id: patientId },
        },
        assignments: {
          create: assingments,
        },
        resources: {
          create: resources,
        },
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
        },
      })
      return tasks
    } catch (error: any) {
      console.error(error)
    }
  }

  async updateTask(data: ITaskUpdate): Promise<Task | Error> {
    const { id, title, description, deadline, patientId, status, attachments } =
      data

    try {
      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(description && { description }),
          ...(deadline && { deadline }),
          ...(status && { status }),
          ...(patientId !== undefined && {
            patient: patientId
              ? { connect: { id: patientId } }
              : { disconnect: true },
          }),
          ...(attachments && {
            attachments: {
              set: [], // reset attachements for the current entry
              connect: attachments.map((attId) => ({ id: attId })),
            },
          }),
        },
        include: {
          patient: true,
          resources: true,
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

      if (!deletedTask) {
        throw new Error(`Task with id ${id} cannot be deleted`)
      }

      return deletedTask
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }
}
