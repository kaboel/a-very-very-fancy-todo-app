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
      user?: JwtPayload
    }
  }
}

interface AuthPayload {
  id: string
  email: string
  role: string
}

type UserRole = "doctor" | "secretary" | "nurse"

type TaskStatus = "new" | "inprogress" | "complete" | "overdue"
