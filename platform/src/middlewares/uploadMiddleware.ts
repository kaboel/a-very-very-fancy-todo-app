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
    const filename = Date.now() + file.originalname
    cb(null, filename)
  },
})

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  if (!allowedTypes.includes(file.mimetype)) {
    cb(null, false)
  }
  cb(null, true)
}

const upload = multer({
  storage,
  fileFilter,
}).array("attachments")

function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
  upload(req, res, (error: any) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: error.message })
    }
    if (error) {
      return res.status(500).json({ message: "Upload error" })
    }
    if (req.files) {
      req.body.attachments = req.files
    }
    next()
  })
}

export default uploadMiddleware
