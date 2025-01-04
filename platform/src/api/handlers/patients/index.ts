import { Request, Response } from "express"
import { PatientPersistence } from "../../../persistence/patients"

const { getPatients } = new PatientPersistence()

export async function get(req: Request, res: Response) {
  try {
    const searchText = req.query.searchText as string
    const tasks = await getPatients(searchText)
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
  tags: ["Patients"],
  summary: "Get Patients",
  description:
    "Retrieve a list of patients based on searchText, if no searchText provided, it will return all.",
  parameters: [{ $ref: "#/components/parameters/SearchText" }],
  responses: {
    "200": {
      description: "A list of patients matching the filters or all",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Patient",
            },
          },
        },
      },
    },
    "404": {
      description: "No patient found matching the provided filters",
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
