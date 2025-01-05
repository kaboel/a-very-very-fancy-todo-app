import { useState, ChangeEvent } from "react"
import { Chip, Box, Button, Typography, Divider } from "@mui/material"
import { FileUpload } from "@mui/icons-material"
import { ITaskResource } from "../helpers/types"

interface FileSelectorProps {
  existingFiles?: ITaskResource[] | null
  onFilesSelect: (files: File[] | null) => void
  onFileDelete: (file: ITaskResource) => void
}

export default function FileSelector(props: FileSelectorProps) {
  const { onFilesSelect, onFileDelete, existingFiles } = props
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files)
      setSelectedFiles(newFiles)
      onFilesSelect(newFiles)
    }
  }

  const handleDelete = (indexToRemove: number) => {
    setSelectedFiles((prevFiles) => {
      if (prevFiles) {
        const updatedFiles = prevFiles.filter(
          (_, index) => index !== indexToRemove
        )
        onFilesSelect(updatedFiles)
        return updatedFiles
      }
      return prevFiles
    })
  }

  return (
    <Box>
      {existingFiles && existingFiles.length > 0 && (
        <Box>
          <Typography variant="body2">Existing resources</Typography>
          {existingFiles.map((file, index) => (
            <Chip
              key={index}
              label={file.originalName}
              onDelete={() => onFileDelete(file)}
            />
          ))}
        </Box>
      )}

      <Divider sx={{ mb: 2 }} />
      <input
        type="file"
        multiple
        hidden
        onChange={handleFileChange}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span" startIcon={<FileUpload />}>
          Resources
        </Button>
      </label>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
        {!selectedFiles?.length && (
          <Typography variant="body2" sx={{ color: "#AAA" }}>
            No files selected.
          </Typography>
        )}
        {selectedFiles?.map((file, index) => (
          <Chip
            key={index}
            label={file.name}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </Box>
    </Box>
  )
}
