import { Request, Response } from "express"
import { UserPersistence } from "../../../persistence/users"

const { getUsers, updateUser } = new UserPersistence()

export async function get(req: Request, res: Response) {
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
}
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

export async function put(req: Request, res: Response) {
  try {
    const { id, firstname, lastname, email, password } = req.body
    const updated = await updateUser({
      id,
      firstname,
      lastname,
      email,
      password,
    })
    res.status(200).json(updated)
  } catch (error: any) {
    res.status(500).json({ message: error.toString() })
  }
  return
}
put.apiDoc = {
  tags: ["Users"],
  summary: "User Update",
  description: "Update a user data",
  requestBody: {
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
