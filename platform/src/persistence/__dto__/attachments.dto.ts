import { Attachment } from "@prisma/client"

export type IAttachmentCreate = Omit<
  Attachment,
  "id" | "createdAt" | "updatedAt" | "taskId"
>
