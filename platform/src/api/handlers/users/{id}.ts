import { Request, Response } from "express"
import { UserPersistence } from "../../../persistence/users"

const { getUser, updateUser, deleteUser } = new UserPersistence()

export async function get(req: Request, res: Response) {
  try {
    const { id: userId } = req.params
    const user = await getUser(userId)
    if (!user) {
      res.status(404).json({ message: "User not found!" })
    }
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.toString() })
  }
  return
}
get.apiDoc = {
  tags: ["Users"],
  summary: "Get User",
  description: "Retrieve a single user by id",
  parameters: [
    {
      $ref: "#/components/parameters/ResourceId",
    },
  ],
  responses: {
    "200": {
      description: "Succesful request",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserProfile",
          },
        },
      },
    },
    "4XX": {
      description: "Request errors",
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

export async function del(req: Request, res: Response) {
  try {
    const { id: userId } = req.params
    const deleted = await deleteUser(userId)
    res.status(200).json({
      message: "User Deleted",
      id: deleted.id,
    })
  } catch (error: any) {
    res.status(500).json({ message: error.toString() })
  }
  return
}
del.apiDoc = {
  tags: ["Users"],
  summary: "Delete User",
  description: "Delete a single user by id",
  parameters: [
    {
      $ref: "#/components/parameters/ResourceId",
    },
  ],
  responses: {
    "200": {
      description: "Succesful request",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/DeleteResponse",
          },
        },
      },
    },
    "4XX": {
      description: "Request errors",
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
