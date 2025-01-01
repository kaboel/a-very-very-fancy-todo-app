import { Request, Response } from "express"
import { AttachmentPersistence } from "../../../persistence/attachments"

const { getAttachments } = new AttachmentPersistence()
