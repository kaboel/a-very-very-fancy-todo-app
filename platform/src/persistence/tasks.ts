import { PrismaClient, Task, TaskStatus } from "@prisma/client"
import { ITaskGetMany, ITaskCreate, ITaskUpdate } from "./__dto__/tasks.dto"

export class TaskPersistence {
  private db: any

  constructor() {
    const prisma = new PrismaClient()

    this.db = prisma.task
  }

  async createTask(data: ITaskCreate): Promise<Task> {
    const {
      title,
      description,
      deadline,
      patientId,
      attachmentIds,
      creatorId,
    } = data

    const newTask = await this.db.create({
      data: {
        title,
        description,
        creatorId,
        deadline,
        patientId,
        status: TaskStatus.NEW,
        ...(attachmentIds?.length && {
          attachments: {
            connect: attachmentIds?.map((id) => ({ id })),
          },
        }),
      },
    })

    return newTask
  }

  async getTask(id: string): Promise<Task | Error> {
    const task = await this.db.findUnique({ where: { id } })
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }
    return task
  }

  async getTasks({
    search,
    status,
    creatorId,
    patientId,
  }: ITaskGetMany): Promise<Task[] | []> {
    const searchText = search
    const tasks = await this.db.findMany({
      where: {
        ...(searchText && {
          title: {
            searchText,
            mode: "insensitive",
          },
          description: {
            searchText,
            mode: "insensitive",
          },
        }),
        ...(status && { status }),
        ...(patientId && { patientId }),
        ...(creatorId && { creatorId }),
      },
    })
    return tasks
  }

  async updateTask(data: ITaskUpdate): Promise<Task | Error> {
    const { id, title, description, deadline, patientId, status, attachments } =
      data

    try {
      const updatedTask = await this.db.update({
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
          attachments: true,
        },
      })

      return updatedTask
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async deleteTask(id: string): Promise<{ id: string }> {
    try {
      const deletedTask = await this.db.delete({
        where: { id },
        select: { id },
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
