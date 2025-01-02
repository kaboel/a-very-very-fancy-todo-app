import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { faker } from "@faker-js/faker"
import { USER_ROLES } from "../../../src/helpers/contants"

interface UserInput {
  name: string
  email: string
  password: string
  role: string
  doctorNumber?: number
}

async function seedUser() {
  try {
    const prisma = new PrismaClient()
    const users = Array.from({ length: 20 }).map(() => {
      const role =
        Object.values(USER_ROLES)[
          Math.floor(Math.random() * Object.values(USER_ROLES).length)
        ]
      const user: UserInput = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("userpassword123", 12),
        role,
      }
      if (role === USER_ROLES.DOCTOR) {
        user["doctorNumber"] = faker.number.int({ min: 10000, max: 99999 })
      }
      return user
    })
    await prisma.user.createMany({
      data: users,
    })
    console.log("User seeded!")
    // Fetch and return userIds for the next seed
    return (await prisma.user.findMany({ select: { id: true } })).map(
      (user) => user.id
    )
  } catch (error: any) {
    console.log("Error seeding User: ", error)
    throw error
  }
}

export default seedUser
