import { DoctorSpecialty, PrismaClient, User } from "@prisma/client"
import { IUserProfile, IUserRegister, IUserUpdate } from "./__dtos__/users.dto"
import Specialty from "./specialty"

const prisma = new PrismaClient()

export class UserPersistence {
  async createUser(data: IUserRegister): Promise<User> {
    const { email, password, name, role, doctorNumber } = data
    try {
      const DoctorSpecialty = new Specialty()
      const specialty = await DoctorSpecialty.getSpecialty(
        data?.specialty || ""
      )
      return await prisma.user.create({
        data: {
          email,
          password,
          name,
          role,
          doctorNumber,
          ...(data.specialty && {
            DoctorSpecialty: {
              connect: { id: specialty?.id },
            },
          }),
        },
      })
    } catch (error: any) {
      console.error(error)
      throw new Error(error.toString())
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          DoctorSpecialty: true,
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
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          DoctorSpecialty: true,
        },
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

  async updateUser(data: IUserUpdate): Promise<User> {
    try {
      const { id, name, email, password } = data
      return await prisma.user.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(email && { email }),
          ...(password && { password }),
        },
      })
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

  //

  // async getSpecialty(title: string): Promise<DoctorSpecialty | null> {
  //   let specialty = await prisma.doctorSpecialty.findFirst({
  //     where: { title },
  //   })

  //   if (!specialty) {
  //     specialty = await prisma.doctorSpecialty.create({
  //       data: {
  //         title,
  //       },
  //     })
  //   }

  //   return specialty
  // }
}
