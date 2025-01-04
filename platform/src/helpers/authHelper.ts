import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import * as dotenv from "dotenv"
import { User } from "@prisma/client"

dotenv.config()

class AuthHelper {
  private SECRET: string

  constructor() {
    this.SECRET = process.env.SECRET || "jwtSecret"
  }

  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  comparePassword(password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash)
  }

  generateToken(payload: User): string {
    return jwt.sign(payload, this.SECRET, { expiresIn: "1d" })
  }

  decodeToken(token: string): jwt.JwtPayload | null {
    try {
      const decode = jwt.verify(token, this.SECRET)
      return decode as User
    } catch (err) {
      return null
    }
  }
}

export default AuthHelper
