import { TaskResource } from "@prisma/client"
import { randomUUID } from "crypto"
import { Request, Response, NextFunction } from "express"
import multer, { StorageEngine } from "multer"
import path from "path"
import fs from "fs"

const allowedTypes: string[] = [
  // Documents
  "application/pdf", // PDF
  "application/msword", // .doc (Microsoft Word)
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx (Microsoft Word)
  "application/vnd.ms-excel", // .xls (Microsoft Excel)
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx (Microsoft Excel)
  "application/vnd.ms-powerpoint", // .ppt (Microsoft PowerPoint)
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx (Microsoft PowerPoint)
  "text/plain", // Text files
  "application/rtf", // Rich Text Format

  // Images
  "image/jpeg", // .jpg, .jpeg
  "image/png", // .png
  "image/gif", // .gif
  "image/bmp", // .bmp
  "image/tiff", // .tiff
  "image/webp", // .webp
  "image/svg+xml", // .svg (Scalable Vector Graphics)
]

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
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
}).array("resources")

export default function uploadMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export function unlinkResource(resource: TaskResource): void {
  const filePath = path.join(__dirname, "../../uploads", resource.filename)
  fs.unlink(filePath, (err) => {
    if (err) {
      throw new Error(err.toString())
    }
  })
}
