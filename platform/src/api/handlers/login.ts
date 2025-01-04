import { Request, Response } from "express"
import AuthHelper from "../../helpers/authHelper"
import { UserPersistence } from "../../persistence/users"

const { getUserForLogin } = new UserPersistence()

export async function post(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    const user = await getUserForLogin(email)
    const auth = new AuthHelper()
    const isMatch = auth.comparePassword(password, user.password)
    if (isMatch) {
      const token = auth.generateToken(user)
      res.status(200).json({ token, user })
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.toString() })
  }
}
post.apiDoc = {
  tags: ["Index"],
  summary: "User Login",
  description: "Authenticate a user",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UserLoginRequest",
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
                description: "A new token issued after login",
              },
            },
          },
        },
      },
    },
    "401": {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                description: "Error message about authentication failure",
              },
            },
          },
        },
      },
    },
  },
}
