import { Request, Response } from "express"
import { UserPersistence } from "../../../persistence/users"
import authMiddleware from "../../../middlewares/authMiddleware"
import AuthHelper from "../../../helpers/authHelper"

const { getUsers, updateUser } = new UserPersistence()

export const get: any = [
  authMiddleware,
  async function get(req: Request, res: Response) {
    try {
      const searchText = req.query.search as string | ""
      const users = await getUsers(searchText)
      if (!users) {
        res.status(404).json({ message: "User not found!" })
      }
      res.status(200).json(users)
    } catch (error: any) {
      res.status(500).json({ message: error.toString() })
    }
    return
  },
]
get.apiDoc = {
  tags: ["Users"],
  summary: "Get Users",
  description: "Retrieve list of users",
  parameters: [
    {
      $ref: "#/components/parameters/SearchText",
    },
  ],
  responses: {
    "200": {
      description: "Succesful request",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UsersList",
          },
        },
      },
    },
    "4XX": {
      description: "Request error",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ErrorResponse",
          },
        },
      },
    },
  },
}
