import { User } from "@prisma/client"

export interface IUserLogin {
  email: string
  password: string
}

export type IUserProfile = Omit<User, "password">

export interface IUserRegister {
  name: string
  email: string
  password: string
  role: string
  doctorNumber?: number
}

export interface IUserUpdate {
  id: string
  name?: string
  email?: string
  password?: string
}
