import {
  Prisma,
  PrismaClient,
  Task,
  TaskAssignment,
  TaskResource,
} from "@prisma/client"
import {
  ITaskGetMany,
  ITaskCreate,
  ITaskUpdate,
  ITaskDelete,
} from "./__dtos__/tasks.dto"
import { TASK_STATUS } from "../helpers/contants"

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

  async getTasksFiltered({
    creatorId,
    patientId,
    assigneeId,
    status,
  }: ITaskGetMany): Promise<Task[] | void> {
    try {
      const where: any = {}
      if (status) {
        if (status === TASK_STATUS.COMPLETE) {
          where.completed = true
        } else if (status === TASK_STATUS.NEW) {
          where.completed = false
          where.deadline = {
            gt: new Date(),
          }
        } else if (status === TASK_STATUS.OVERDUE) {
          where.completed = false
          where.deadline = {
            lt: new Date(),
          }
        }
      }
      if (creatorId) {
        where.creatorId = creatorId
      }
      if (patientId) {
        where.patientId = patientId
      }
      if (assigneeId) {
        where.assignments = {
          some: {
            userId: assigneeId,
          },
        }
      }
      const tasks = await prisma.task.findMany({
        where,
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
      resourceIdsToDelete,
    } = data
    try {
      const updated = await prisma.task.update({
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
          ...((resources?.length || resourceIdsToDelete) && {
            resources: {
              ...(resourceIdsToDelete &&
                resourceIdsToDelete.length > 0 && {
                  deleteMany: {
                    id: { in: resourceIdsToDelete },
                  },
                }),
              create: resources,
            },
          }),
        },
        include: {
          assignments: true,
          resources: true,
          patient: true,
        },
      })
      if (!updated) {
        throw new Error(`Task with id ${taskId} cannot be updated`)
      }

      return updated
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async deleteTask(id: string): Promise<ITaskDelete> {
    try {
      const deletedTask = await prisma.task.delete({
        where: { id },
        include: {
          resources: true,
        },
      })
      return deletedTask
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async getResource(resourceId: string): Promise<TaskResource> {
    try {
      const resource = await prisma.taskResource.findUnique({
        where: {
          id: resourceId,
        },
      })
      if (!resource) {
        throw new Error("Resource not found")
      }
      return resource
    } catch (error: any) {
      throw new Error(error.toString)
    }
  }
}
