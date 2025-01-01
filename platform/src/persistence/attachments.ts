import { Attachment, PrismaClient } from "@prisma/client"

export class AttachmentPersistence {
  private db: any

  constructor() {
    const prisma = new PrismaClient()
    this.db = prisma.attachment
  }

  async getAttachment(id: string): Promise<Attachment> {
    try {
      const attachment = await this.db.findUnique({
        where: { id },
      })
      if (!attachment) {
        throw new Error(`Attachment with id ${id} not found`)
      }
      return attachment
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async getAttachments(searchText?: string): Promise<Attachment[] | []> {
    const attachments = await this.db.findMany({
      where: {
        ...(searchText && {
          name: {
            search: searchText,
            mode: "insensitive",
          },
        }),
      },
    })
    return attachments
  }

  async createAttachment(file: Express.Multer.File): Promise<Attachment> {
    const newAttachment = this.db.create({
      data: {
        filename: file.filename,
        path: file.path,
        type: file.mimetype,
        size: file.size,
      },
    })
    return newAttachment
  }

  async bulkCreateAttachments(files: Express.Multer.File[]): Promise<string[]> {
    try {
      const attachmentIds: string[] = []
      for (const file of files) {
        const newAttachment = await this.createAttachment(file)
        attachmentIds.push(newAttachment.id)
      }
      return attachmentIds
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }

  async bulkDeleteAttachments(ids: string[]): Promise<number> {
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

  async deleteAttachment(id: string): Promise<{ id: string }> {
    try {
      const deletedAttachment = await this.db.delete({
        where: { id },
        select: { id },
      })

      if (!deletedAttachment) {
        throw new Error(`Attachment with ID ${id} not found`)
      }

      return deletedAttachment
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }
}
