import { TaskResource, PrismaClient } from "@prisma/client"

export class ResourcePersistence {
  private db: any

  constructor() {
    const prisma = new PrismaClient()
    this.db = prisma.taskResource
  }

  async getResource(id: string): Promise<TaskResource> {
    try {
      const Resource = await this.db.findUnique({
        where: { id },
      })
      if (!Resource) {
        throw new Error(`Resource with id ${id} not found`)
      }
      return Resource
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async getTaskResources(taskId: string): Promise<TaskResource[]> {
    const resources = await this.db.findMany({
      where: { taskId },
    })
    return resources
  }

  async createResource(file: TaskResource): Promise<TaskResource> {
    const newResource = this.db.create({
      data: {
        filename: file.filename,
        path: file.path,
        type: file.mimetype,
        size: file.size,
      },
    })
    return newResource
  }

  async bulkCreateResources(files: TaskResource[]): Promise<string[]> {
    try {
      const ResourceIds: string[] = []
      for (const file of files) {
        const newResource = await this.createResource(file)
        ResourceIds.push(newResource.id)
      }
      return ResourceIds
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async bulkDeleteResources(ids: string[]): Promise<number> {
    try {
      const result = await this.db.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      return result.count
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async deleteResource(id: string): Promise<{ id: string }> {
    try {
      const deletedResource = await this.db.delete({
        where: { id },
        select: { id },
      })

      if (!deletedResource) {
        throw new Error(`Resource with ID ${id} not found`)
      }

      return deletedResource
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }
}
