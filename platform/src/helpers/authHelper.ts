import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import * as dotenv from "dotenv"

dotenv.config()

class AuthHelper {
  private SECRET: string

  constructor() {
    // Use the environment variable or default to 'jwtSecret'
    this.SECRET = process.env.SECRET || "jwtSecret"
  }

  /**
   * Encrypt the password using bcrypt
   * @param password - The plain text password to encrypt
   * @returns The hashed password
   */
  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  /**
   * Compare the given password with the stored hashed password
   * @param password - The plain text password
   * @param passwordHash - The hashed password
   * @returns True if the password matches, otherwise false
   */
  comparePassword(password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash)
  }

  /**
   * Generate a JWT token
   * @param payload - The payload containing the user ID (or any other necessary data)
   * @returns The generated JWT token
   */
  generateToken(payload: AuthPayload): string {
    return jwt.sign(payload, this.SECRET, { expiresIn: "1d" })
  }

  /**
   * Decode the JWT token and retrieve the payload
   * @param token - The JWT token to decode
   * @returns The decoded payload
   */
  decodeToken(token: string): jwt.JwtPayload | null {
    try {
      const decode = jwt.decode(token, { complete: true })
      return decode
    } catch (err) {
      return null
    }
  }
}

export default AuthHelper
