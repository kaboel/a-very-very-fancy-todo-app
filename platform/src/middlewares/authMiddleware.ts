import { User } from "@prisma/client"
import { Request, Response, NextFunction } from "express"
import AuthHelper from "../helpers/authHelper"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" })
    }
    const token = authHeader.split(" ")[1]
    if (!token) {
      return res.status(401).json({ message: "Token missing" })
    }
    const auth = new AuthHelper()
    const decoded = auth.decodeToken(token)
    if (typeof decoded === "string" || !decoded) {
      return res.status(401).json({ message: "Invalid token structure" })
    }
    req.user = decoded as User
    next()
  } catch (error: any) {
    console.error("Error verifying token:", error.message)
    res.status(401).json({ message: error.message })
  }
}

export default authMiddleware
