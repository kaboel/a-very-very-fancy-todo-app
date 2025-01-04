import { Request, Response } from "express"
import authMiddleware from "../../../../middlewares/authMiddleware"
import { TaskPersistence } from "../../../../persistence/tasks"

const { updateTask } = new TaskPersistence()

export const put: any = [
  authMiddleware,
  async function put(req: Request, res: Response) {
    try {
      const taskId = req.params.id
      const updated = await updateTask(taskId, { completed: true })
      if (!updated) {
        res.status(403).json({ message: "Cannot mark task as completed." })
      }
      res.status(200).json(updated)
    } catch (error: any) {
      res.status(500).json({ message: error.toString() })
    }
  },
]
put.apiDoc = {
  tags: ["Tasks"],
  summary: "Mark Task Completed",
  description: "Mark a selected task by Id as completed",
  parameters: [
    {
      $ref: "#/components/parameters/ResourceId",
    },
  ],
  responses: {
    "200": {
      description: "Task successfully marked completed",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TaskResponse",
          },
        },
      },
    },
    "4XX": {
      description: "Bad request, invalid data provided",
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
