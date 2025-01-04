import { PrismaClient, Patient } from "@prisma/client"
import { IPatientCreate, IPatientUpdate } from "./__dtos__/patients.dto"

const prisma = new PrismaClient()

export class PatientPersistence {
  async createPatient(data: Partial<Patient>): Promise<Patient> {
    const newPatient = await prisma.patient.create({
      data,
    })
    return newPatient
  }

  async getPatient(id: string): Promise<Patient> {
    try {
      const patient = await prisma.patient.findUnique({
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
    const patients = await prisma.patient.findMany({
      where: {
        ...(searchText && {
          name: {
            search: searchText,
            mode: "insensitive",
          },
        }),
      },
      include: {
        doctors: true,
      },
    })
    return patients
  }

  async updatePatient({ id, ...payload }: IPatientUpdate): Promise<Patient> {
    try {
      const updated = await prisma.patient.update({
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
      const deleted = await prisma.patient.delete({
        where: { id },
        select: { id: true },
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
