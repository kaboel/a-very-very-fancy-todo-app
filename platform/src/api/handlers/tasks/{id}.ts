import { Request, Response } from "express"
import { TaskPersistence } from "../../../persistence/tasks"

const { getTask, deleteTask } = new TaskPersistence()

export async function get(req: Request, res: Response) {
  try {
    const { id: taskId } = req.params

    const task = await getTask(taskId)
    if (!task) {
      res.status(404).json({ message: `Task with id ${taskId} not found` })
    }

    res.status(200).json(task)
  } catch (error: any) {
    res.status(500).json(error.toString())
  }
}
get.apiDoc = {
  tags: ["Tasks"],
  summary: "Get Task",
  description: "Retrieve a single task by id",
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
            $ref: "#/components/schemas/TaskResponse",
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
    const { id: taskId } = req.params

    const deleted = await deleteTask(taskId)
    if (!deleted) {
      res.status(403).json({ message: `Unauthorized` })
    }

    res.status(200).json({
      message: "Task deleted!",
      id: deleted.id,
    })
  } catch (error: any) {
    res.status(500).json(error.toString())
  }
}
del.apiDoc = {
  tags: ["Tasks"],
  summary: "Delete Task",
  description: "Delete a single task by id",
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
