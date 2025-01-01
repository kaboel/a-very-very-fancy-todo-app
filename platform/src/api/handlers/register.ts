import { UserRole } from "@prisma/client"
import { Request, Response } from "express"
import AuthHelper from "../../helpers/authHelper"
import { generateDoctorNumber } from "../../helpers/constHelper"
import { IUserRegister } from "../../persistence/__dto__/users.dto"
import { UserPersistence } from "../../persistence/users"

const { createUser } = new UserPersistence()

export async function post(req: Request, res: Response) {
  try {
    const { firstname, lastname, email, role, password } = req.body
    const auth = new AuthHelper()
    const passwordHash = await auth.encryptPassword(password)
    const userData: IUserRegister = {
      firstname,
      lastname,
      email,
      role,
      password: passwordHash,
      doctorNumber: null,
    }
    if (role === UserRole.DOCTOR) {
      userData.doctorNumber = generateDoctorNumber()
    }
    const newUser = await createUser(userData)
    res.status(200).json(newUser)
  } catch (error: any) {
    res.status(500).json({ message: error.toString() })
  }
}
post.apiDoc = {
  tags: ["Index"],
  summary: "User Registration",
  description: "Create / Register a new user",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UserRegisterRequest",
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Succesful request",
      content: {
        "application/json": {
          schema: {
            description: "Success",
          },
        },
      },
    },
  },
}
