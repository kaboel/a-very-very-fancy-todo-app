import { Task, TaskStatus } from "@prisma/client"

export type ITaskCreate = Omit<
  Task,
  "id" | "status" | "createdAt" | "updatedAt"
> & {
  attachmentIds?: string[]
}

export type ITaskGetMany = {
  search?: string
  status?: string
  creatorId?: string
  patientId?: string
}

export type ITaskUpdate = {
  id: string
  title?: string
  description?: string
  deadline?: Date
  patientId?: string
  status?: TaskStatus
  attachments?: string[]
}
