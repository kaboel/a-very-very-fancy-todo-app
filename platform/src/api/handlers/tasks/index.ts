import { Request, Response } from "express"
import { AttachmentPersistence } from "../../../persistence/attachments"
import { TaskPersistence } from "../../../persistence/tasks"
import { ITaskGetMany } from "../../../persistence/__dto__/tasks.dto"

const { bulkCreateAttachments } = new AttachmentPersistence()
const { createTask, getTasks, updateTask } = new TaskPersistence()

export async function get(req: Request, res: Response) {
  try {
    const data: ITaskGetMany = req.query
    const tasks = await getTasks(data)
    if (!tasks) {
      res.status(404).json({ message: "Task not found!" })
    }
    res.status(200).json(tasks)
  } catch (error: any) {
    res.status(500).json({ message: error.toString() })
  }
  return
}
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

export async function post(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      deadline,
      patientId = null,
      creatorId,
    } = req.body
    const attachments = req.files as Express.Multer.File[]
    let attachmentIds: string[] = []

    if (attachments?.length) {
      attachmentIds = await bulkCreateAttachments(attachments)
    }

    const newTask = await createTask({
      title,
      description,
      deadline,
      patientId,
      attachmentIds,
      creatorId,
    })

    res.status(200).json(newTask)
  } catch (error: any) {
    res.status(500).json({ message: error.toString() })
  }
}
post.apiDoc = {
  tags: ["Tasks"],
  summary: "Create a new task with optional attachments",
  operationId: "createTask",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/TaskCreateRequest",
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Task successfully created",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TaskResponse",
          },
        },
      },
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

export async function put(req: Request, res: Response) {
  try {
    const { id, title, description, deadline, patientId, attachments, status } =
      req.body
    const updatedTask = await updateTask({
      id,
      title,
      description,
      deadline,
      status,
      patientId,
      attachments,
    })
    res.status(200).json(updatedTask)
  } catch (error: any) {
    res.status(500).json(error.toString())
  }
}
put.apiDoc = {
  tags: ["Tasks"],
  summary: "Update Task",
  description: "Update the details of an existing task",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "The ID of the task to update",
      schema: {
        type: "string",
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/TaskUpdateRequest",
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Task successfully updated",
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
