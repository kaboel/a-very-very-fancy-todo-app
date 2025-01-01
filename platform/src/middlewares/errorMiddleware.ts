import { ErrorRequestHandler } from "express"

const errorMiddleware: ErrorRequestHandler = (err, _, res) => {
  console.error("Error", err)
  res.status(err.status || 500).json({
    message: err.message || "An error has occured",
    details: err.errors || null,
  })
}

export default errorMiddleware
