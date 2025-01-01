import fs from "fs"
import path from "path"
import express, { ErrorRequestHandler } from "express"
import { initialize } from "express-openapi"
import dotenv from "dotenv"
import * as swaggerUi from "swagger-ui-express"
import errorMiddleware from "./middlewares/errorMiddleware"
import uploadMiddleware from "./middlewares/uploadMiddleware"

dotenv.config()

export async function init() {
  const app = express()
  const apiDoc = path.resolve(__dirname, "../openapi.yaml")
  const paths = path.resolve(__dirname, "./api/handlers")

  app.use(express.json())

  await initialize({
    app,
    apiDoc: fs.readFileSync(apiDoc, "utf8"),
    docsPath: "/docs",
    promiseMode: true,
    exposeApiDocs: true,
    paths,
    consumesMiddleware: {
      "multipart/form-data": uploadMiddleware,
    },
    errorMiddleware,
    routesGlob: "**/*.{js,ts}",
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
  })

  app.use(
    "/api/docs/swagger",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        title: "API Specs - A very very fancy todo app",
        url: "http://localhost:3000/api/docs",
      },
    })
  )

  return app
}

export async function start() {
  const app = await init()
  const { SERVER_PORT } = process.env

  app.listen(SERVER_PORT, () => {
    console.log(`App: server is running on port ${SERVER_PORT}`)
  })

  return app
}
