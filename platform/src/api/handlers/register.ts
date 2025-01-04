import { Request, Response } from "express"
import AuthHelper from "../../helpers/authHelper"
import { generateDoctorNumber } from "../../helpers/constHelper"
import { IUserRegister } from "../../persistence/__dtos__/users.dto"
import { UserPersistence } from "../../persistence/users"
import { USER_ROLES } from "../../helpers/contants"

const { createUser } = new UserPersistence()

export async function post(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body
    const auth = new AuthHelper()
    const passwordHash = await auth.encryptPassword(password)
    const userData: IUserRegister = {
      name,
      email,
      role,
      password: passwordHash,
      doctorNumber: null,
    }
    if (role === USER_ROLES.DOCTOR) {
      userData.doctorNumber = generateDoctorNumber()
    }
    const user = await createUser(userData)
    const token = auth.generateToken(user)

    res.status(200).json({ token, user })
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
      description: "Successful request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user: {
                $ref: "#/components/schemas/User",
              },
              token: {
                type: "string",
                description: "A new token issued after register",
              },
            },
          },
        },
      },
    },
  },
}
