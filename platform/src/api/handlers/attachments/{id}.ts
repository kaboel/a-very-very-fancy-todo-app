import { Request, Response } from "express"
import { AttachmentPersistence } from "../../../persistence/attachments"

const { getAttachment } = new AttachmentPersistence()

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params
    const attachment = await getAttachment(id)
    return attachment
  } catch (error: any) {
    res.status(500).json({ error })
  }
}
get.apiDoc = {
  tags: ["Attachments"],
  summary: "Get Attachment",
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
            $ref: "#/components/schemas/Attachment",
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
