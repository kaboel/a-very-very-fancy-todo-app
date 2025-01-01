import { PrismaClient, Patient } from "@prisma/client"
import { IPatientCreate, IPatientUpdate } from "./__dto__/patients.dto"

export class PatientPersistence {
  private db: any

  constructor() {
    const prisma = new PrismaClient()

    this.db = prisma.patient
  }

  async createPatient(data: IPatientCreate): Promise<Patient> {
    const newPatient = await this.db.create({
      data,
    })
    return newPatient
  }

  async getPatient(id: string): Promise<Patient> {
    try {
      const patient = await this.db.findUnique({
        where: {
          id,
        },
      })
      if (!patient) {
        throw new Error(`Patient with id ${id} not found`)
      }
      return patient
    } catch (error: any) {
      throw new Error(`Internal Server Error`)
    }
  }

  async getPatients(searchText?: string): Promise<Patient[]> {
    const patients = await this.db.findMany({
      where: {
        ...(searchText && {
          firstname: {
            search: searchText,
            mode: "insensitive",
          },
          lastname: {
            search: searchText,
            mode: "insensitive",
          },
        }),
      },
    })
    return patients
  }

  async updatePatient({ id, ...payload }: IPatientUpdate): Promise<Patient> {
    try {
      const updated = await this.db.update({
        where: { id },
        data: payload,
      })
      if (!updated) {
        throw new Error(`Patient with id ${id} cannot be updated`)
      }
      return updated
    } catch (error: any) {
      throw new Error(`Internal Server Error`)
    }
  }

  async deletePatient(id: string): Promise<{ id: string }> {
    try {
      const deleted = await this.db.delete({
        where: { id },
        select: { id },
      })
      if (!deleted) {
        throw new Error(`Patient with id ${id} cannot be deleted`)
      }
      return deleted
    } catch (error: any) {
      throw new Error(`Internal Server Error`)
    }
  }
}
