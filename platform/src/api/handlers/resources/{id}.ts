import { Request, Response } from "express"
import { ResourcePersistence } from "../../../persistence/resources"

const { getResource } = new ResourcePersistence()

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params
    const attachment = await getResource(id)
    return attachment
  } catch (error: any) {
    res.status(500).json({ error })
  }
}
get.apiDoc = {
  tags: ["Resources"],
  summary: "Get Resources",
  description: "Get single attachment by id",
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
            $ref: "#/components/schemas/TaskResource",
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
