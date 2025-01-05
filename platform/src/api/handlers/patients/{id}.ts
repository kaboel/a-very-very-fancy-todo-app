import { Request, Response } from "express"
import authMiddleware from "../../../middlewares/authMiddleware"
import { PatientPersistence } from "../../../persistence/patients"

const { deletePatient, updatePatient } = new PatientPersistence()

export const put: any = [
  authMiddleware,
  async function put(req: Request, res: Response) {
    try {
      const taskId = req.params.id
      const updated = await updatePatient(taskId, req.body)
      if (!updated) {
        res.status(403).json({ message: "Forbidden" })
      }
      res.status(200).json(updated)
    } catch (error: any) {
      res.status(500).json({ message: error.toString() })
    }
  },
]
put.apiDoc = {
  tags: ["Patients"],
  summary: "Update Patient",
  description: "Update a single patient by id",
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

export const del: any = [
  authMiddleware,
  async function del(req: Request, res: Response) {
    try {
      const { id: patientId } = req.params
      const deleted = await deletePatient(patientId)
      if (!deleted) {
        res.status(403).json({ message: `Unauthorized` })
      }
      res.status(200).json({
        message: "Patient deleted!",
        id: deleted.id,
      })
    } catch (error: any) {
      res.status(500).json(error.toString())
    }
  },
]
del.apiDoc = {
  tags: ["Patients"],
  summary: "Delete Patient",
  description: "Delete a single patient by id",
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
