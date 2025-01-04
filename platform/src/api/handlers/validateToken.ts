import { Request, Response } from "express"
import AuthHelper from "../../helpers/authHelper"
import { User } from "@prisma/client"
import authMiddleware from "../../middlewares/authMiddleware"
import { UserPersistence } from "../../persistence/users"

const { getUser } = new UserPersistence()

export const get: any = [
  authMiddleware,
  async function get(req: Request, res: Response) {
    try {
      const { id } = req.user as User
      const user = await getUser(id)
      const auth = new AuthHelper()
      const newToken = auth.generateToken(user)
      return res.status(200).json({
        user,
        token: newToken,
      })
    } catch (error: any) {
      res.status(500).json({ message: error.toString() })
    }
  },
]
get.apiDoc = {
  tags: ["Index"],
  summary: "Validate Token",
  description: "Validate an existing token stored in the users browser",
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
                description: "A new token issued after validation",
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
