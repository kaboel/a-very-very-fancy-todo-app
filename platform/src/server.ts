import fs from "fs"
import path from "path"
import express, { NextFunction, Request, Response } from "express"
import { initialize } from "express-openapi"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import * as swaggerUi from "swagger-ui-express"
import uploadMiddleware from "./middlewares/uploadMiddleware"

dotenv.config()

export async function init() {
  const app = express()
  const apiDoc = path.resolve(__dirname, "../openapi.yaml")
  const paths = path.resolve(__dirname, "./api/handlers")

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      methods: "GET,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    })
  )
  app.use(
    morgan((tokens, req, res) =>
      [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ")
    )
  )
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

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
