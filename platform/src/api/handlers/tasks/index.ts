import { Request, Response } from "express"
import { ResourcePersistence } from "../../../persistence/resources"
import { TaskPersistence } from "../../../persistence/tasks"
import authMiddleware from "../../../middlewares/authMiddleware"

import type { ITaskGetMany } from "../../../persistence/__dtos__/tasks.dto"
import { compareAsc, isValid } from "date-fns"

const { createTask, getTasks } = new TaskPersistence()

export const get: any = [
  authMiddleware,
  async function get(req: Request, res: Response) {
    try {
      const data: ITaskGetMany = req.query
      const tasks = await getTasks(data)
      if (!tasks) {
        return res.status(404).json({ message: "Tasks not found!" })
      }
      const sortedTasks = tasks.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        if (a.deadline && b.deadline) {
          const dateA = new Date(a.deadline)
          const dateB = new Date(b.deadline)
          if (isValid(dateA) && isValid(dateB)) {
            return compareAsc(dateA, dateB)
          }
        }
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return 0
      })

      res.status(200).json(sortedTasks)
    } catch (error: any) {
      res.status(500).json({ message: error.toString() })
    }
  },
]
get.apiDoc = {
  tags: ["Tasks"],
  summary: "Get Tasks",
  description: "Retrieve a list of tasks based on query filters.",
  parameters: [
    { $ref: "#/components/parameters/SearchText" },
    {
      name: "status",
      in: "query",
      required: false,
      description: "Filter tasks by status",
      schema: {
        type: "string",
      },
    },
    {
      name: "creatorId",
      in: "query",
      required: false,
      description: "Filter tasks by the creator's ID",
      schema: {
        type: "string",
      },
    },
    {
      name: "patientId",
      in: "query",
      required: false,
      description: "Filter tasks by the patient's ID",
      schema: {
        type: "string",
      },
    },
    {
      name: "assignedToMe",
      in: "query",
      required: false,
      description: "Filter tasks by assignment",
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    "200": {
      description: "A list of tasks matching the filters",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Task",
            },
          },
        },
      },
    },
    "404": {
      description: "No tasks found matching the provided filters",
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

export const post: any = [
  authMiddleware,
  async function post(req: Request, res: Response) {
    try {
      const body = req.body
      const files = req.files
      const resources = files?.map((file) => {
        return {
          originalName: file.originalname,
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          path: `/uploads/${file.filename}`,
        }
      })
      const task = await createTask({
        ...body,
        resources,
      })
      res.status(200).json(task)
      res.status(204).send()
    } catch (error: any) {
      res.status(500).json({ message: error.toString() })
    }
  },
]
post.apiDoc = {
  tags: ["Tasks"],
  summary: "Create a new task with optional attachments",
  operationId: "createTask",
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          $ref: "#/components/schemas/TaskCreateRequest",
        },
      },
    },
  },
  responses: {
    "204": {
      description: "Task successfully created",
    },
    "400": {
      description: "Missing required fields or invalid input",
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
