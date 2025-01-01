import { User } from "@prisma/client"

export type IUserRegister = Omit<User, "id" | "createdAt" | "updatedAt">
export type IUserProfile = Omit<User, "password">
export type IUserUpdate = Omit<
  User,
  "role" | "doctorNumber" | "createdAt" | "updatedAt"
>
