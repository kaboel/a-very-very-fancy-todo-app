export type IAPIStatus = "idle" | "loading" | "failed"

export type IUserRole = "doctor" | "nurse" | "secretary"

export type ITaskStatus = "new" | "complete" | "overdue"

export interface IUser {
  id: string
  name: string
  email: string
  token: string
  role: IUserRole
  doctorNumber?: number
  patients?: IPatient[]
  tasks?: ITask[]
  assingments?: ITask[]
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface ITask {
  id: string
  title: string
  description: string
  deadline: string | Date
  completed: boolean
  status: ITaskStatus
  creatorId: string
  creator: IUser
  patientId?: string
  patient?: IPatient
  assignments?: ITaskAssignments[]
  resources?: ITaskResource[]
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface IPatient {
  id: string
  name: string
  phone: string
  address: string
  mentions?: ITask[]
  doctors?: IPatientOnDoctor[]
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type ITaskResource = {
  id: string
  originalName: string
  filename: string
  mimetype: string
  size: string
  resourceType: IResourceType
  task: ITask
  createdAt?: string | Date
} & File

export interface IResourceType {
  id: string
  type: string
  createdAt?: string | Date
}

// relationships
export interface IPatientOnDoctor {
  id?: string
  doctorId?: string
  patientId?: string
  createdAt?: string | Date
}

export interface ITaskAssignments {
  id: string
  taskId: string
  userId: string
  createdAt?: string | Date
}
