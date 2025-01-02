import { PrismaClient } from "@prisma/client"
import seedUser from "./seeders/userSeeder"
import seedPatient from "./seeders/patientSeeder"
import seedResourceType from "./seeders/resourceTypeSeeder"
import seedTask from "./seeders/taskSeeder"
import seedPatientOnDoctor from "./seeders/patientOnDoctorSeeder"
import seedTaskAssignment from "./seeders/taskAssignmentSeeder"

async function clearTables() {
  try {
    const prisma = new PrismaClient()
    await prisma.$executeRaw`TRUNCATE TABLE "User", "Patient", "Task", "PatientOnDoctor", "TaskAssignment", "TaskResource", "ResourceType" RESTART IDENTITY CASCADE;`
    console.log("Database cleared!\n")
  } catch (error: any) {
    console.error(`Error clearing db tables!`, error)
    throw error
  }
}

async function initSeed() {
  try {
    console.log("Seeding database...\n")
    const userIds = await seedUser()
    const patientIds = await seedPatient()

    await seedResourceType()
    await seedTask(userIds, patientIds)
    await seedPatientOnDoctor(patientIds)
    await seedTaskAssignment(userIds)
    console.log("\nDatabase seeded!")
  } catch (error: any) {
    console.error("Seeding operation failed: ", error)
    throw error
  }
}

async function main() {
  if (process.env.NODE_ENV !== "dev") {
    console.error("\nDanger: you are not on dev!")
    console.error("Seeding aborted!")
  } else {
    await clearTables()
    await initSeed()
  }
}

main()
