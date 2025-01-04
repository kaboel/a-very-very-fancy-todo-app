import { Request, Response } from "express"
import { UserPersistence } from "../../../persistence/users"
import authMiddleware from "../../../middlewares/authMiddleware"
import AuthHelper from "../../../helpers/authHelper"

const { getUser, updateUser, deleteUser } = new UserPersistence()

export const get: any = [
  authMiddleware,
  async function get(req: Request, res: Response) {
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
  },
]
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
            $ref: "#/components/schemas/User",
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

export const del: any = [
  authMiddleware,
  async function del(req: Request, res: Response) {
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
  },
]
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

export const put: any = [
  authMiddleware,
  async function put(req: Request, res: Response) {
    try {
      const id = req.params.id
      const body = req.body
      const user = req.user
      if (id !== user?.id) {
        res.status(403).json({ message: "Forbidden" })
      }
      const toUpdate = {
        id: user?.id || body.id,
        name: body.name,
        email: body.email,
      }
      const updated = await updateUser(toUpdate)
      res.status(200).json(updated)
    } catch (error: any) {
      res.status(500).json({ message: error.toString() })
    }
  },
]
put.apiDoc = {
  tags: ["Users"],
  summary: "Update User Profile",
  description: "User user profile",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UserUpdateRequest",
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Update request successful",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
          },
        },
      },
    },
    "4XX": {
      description: "Request error.",
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
