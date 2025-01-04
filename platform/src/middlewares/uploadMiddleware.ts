import { randomUUID } from "crypto"
import { Request, Response, NextFunction } from "express"
import multer, { StorageEngine } from "multer"
import path from "path"

const allowedTypes: string[] = ["image/png", "image/jpg", "application/pdf"]

const storage: StorageEngine = multer.diskStorage({
  destination: (_, __, cb) => {
    const dest = path.join(__dirname, "../../uploads")
    cb(null, dest)
  },
  filename: (_, file, cb) => {
    const filename = `${randomUUID()}${path.extname(file.originalname)}`
    cb(null, filename)
  },
})

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  console.log(`Uploading type: ${file.mimetype}`)
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(null, false)
  }
  cb(null, true)
}

const upload = multer({
  storage,
  fileFilter,
}).array("resources")

function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
  upload(req, res, (error: any) => {
    if (error instanceof multer.MulterError) {
      console.error(error)
      return res.status(400).json({ message: error.message })
    }
    if (error) {
      console.error(error)
      return res.status(500).json({ message: "Upload error" })
    }
    next()
  })
}

export default uploadMiddleware
