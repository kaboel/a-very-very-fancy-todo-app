import { PrismaClient, User } from "@prisma/client"
import { IUserProfile, IUserRegister, IUserUpdate } from "./__dtos__/users.dto"

const prisma = new PrismaClient()

export class UserPersistence {
  async createUser(data: IUserRegister): Promise<User> {
    const { email, password, name, role, doctorNumber } = data
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          password,
          name,
          role,
          doctorNumber,
        },
      })
      return newUser
    } catch (error: any) {
      console.error(error)
      throw new Error(error.toString())
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        throw new Error(`User with id ${id} not found`)
      }
      return user
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async getUserForLogin(email: string): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        throw new Error(`User with email ${email} not found`)
      }

      return user
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async getUsers(searchText?: string): Promise<IUserProfile[] | []> {
    const users = await prisma.user.findMany({
      where: {
        ...(searchText && {
          email: {
            search: searchText,
            mode: "insensitive",
          },
          name: {
            search: searchText,
            mode: "insensitive",
          },
        }),
      },
    })
    return users
  }

  async updateUser(data: IUserUpdate): Promise<IUserProfile> {
    try {
      const { id, email, password, name } = data

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          ...(email && { email }),
          ...(password && { password }),
          ...(name && { name }),
        },
      })
      return updatedUser
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async deleteUser(id: string): Promise<{ id: string }> {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id },
        select: { id: true },
      })

      if (!deletedUser) {
        throw new Error("Cannot delete user")
      }

      return deletedUser
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }
}
