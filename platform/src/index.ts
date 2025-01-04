import fs from "fs"
import path from "path"
import { start } from "./server"

const REQUIRED_ENV_VARS = [
  "SERVER_PORT",
  "JWT_SECRET",
  "DATABASE_URL",
  "CLIENT_ORIGIN",
]

const validateEnv = (): void => {
  const envPath = path.resolve(__dirname, "../.env")
  if (!fs.existsSync(envPath)) {
    console.error("Error: .env file is missing.")
    console.log("Please run `npm run init` to generate it.")
    process.exit(1)
  }
  require("dotenv").config()
  const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key])
  if (missingVars.length > 0) {
    console.error(
      `Error: Missing required environment variables: ${missingVars.join(", ")}`
    )
    console.error("Please update your .env file or run `npm run init`.")
    process.exit(1)
  }
}

// Run environment validation
validateEnv()

// Start the server
start()
