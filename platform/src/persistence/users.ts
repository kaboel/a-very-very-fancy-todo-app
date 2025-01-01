import { PrismaClient, User } from "@prisma/client"
import { IUserProfile, IUserRegister, IUserUpdate } from "./__dto__/users.dto"

export class UserPersistence {
  private db: any

  constructor() {
    const prisma = new PrismaClient()

    this.db = prisma.user
  }

  async createUser(data: IUserRegister): Promise<IUserProfile> {
    const { email, password, firstname, lastname, role, doctorNumber } = data
    try {
      const newUser = await this.db.create({
        data: {
          email,
          password,
          firstname,
          lastname,
          role,
          doctorNumber,
        },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          role: true,
          doctorNumber: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      return newUser
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async getUser(id: string): Promise<IUserProfile | Error> {
    try {
      const user = await this.db.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          role: true,
          doctorNumber: true,
        },
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
      const user = await this.db.findUnique({
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
    const users = await this.db.findMany({
      where: {
        ...(searchText && {
          firstname: {
            search: searchText,
            mode: "insensitive",
          },
          lastname: {
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
      const { id, email, password, firstname, lastname } = data

      const updatedUser = await this.db.update({
        where: { id },
        data: {
          ...(email && { email }),
          ...(password && { password }),
          ...(firstname && { password }),
          ...(lastname && { lastname }),
        },
      })
      return updatedUser
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async deleteUser(id: string): Promise<{ id: string }> {
    try {
      const deletedUser = await this.db.delete({
        where: { id },
        select: { id },
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
