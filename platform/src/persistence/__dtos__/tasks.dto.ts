import { Task, TaskResource } from "@prisma/client"
import { TASK_STATUS } from "../../helpers/contants"
import { ITaskStatus } from "../../global"

export interface ITaskCreate {
  title: string
  description: string
  deadline: Date
  creatorId: string
  patientId?: string
  assigneeIds?: string[]
  resources?: Omit<TaskResource, "id" | "taskId">[]
}

export type ITaskGetMany = {
  search?: string
  status?: string
  creatorId?: string
  patientId?: string
  assignedToMe?: string
}

export type ITaskUpdate = {
  id: string
  title?: string
  description?: string
  deadline?: Date
  patientId?: string
  completed?: boolean
  assigneeIds?: string[]
  resources?: TaskResource[]
}

export type ITaskResponse = Task & {
  status: ITaskStatus
}
