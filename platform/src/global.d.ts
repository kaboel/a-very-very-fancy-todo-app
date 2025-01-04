import { Request, Response } from "express"
import { User } from "@prisma/client"

declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PORT: string
    DATABASE_URL: string
    JWT_SECRET: string
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: User
      files?: Express.Multer.File[]
    }
  }
}

export interface OpenApiHandler {
  (req: Request, res: Response): Promise<void>
  apiDoc?: object
}

export type IUserRole = "doctor" | "nurse" | "secretary"

export type ITaskStatus = "new" | "complete" | "overdue"
