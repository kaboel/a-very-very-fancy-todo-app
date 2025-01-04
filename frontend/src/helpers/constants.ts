import { ITaskStatus, IUserRole } from "./types"

export const TASK_STATUS: { [key: string]: ITaskStatus } = {
  NEW: "new",
  COMPLETE: "complete",
  OVERDUE: "overdue",
}

export const USER_ROLES: { [key: string]: IUserRole } = {
  DOCTOR: "doctor",
  NURSE: "nurse",
  SECRETARY: "secretary",
}
