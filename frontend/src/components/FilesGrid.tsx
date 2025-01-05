import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  styled,
  Typography,
} from "@mui/material"
import { ITaskResource } from "../helpers/types"
import CloudDownload from "@mui/icons-material/CloudDownload"
import { downloadFile } from "../helpers/miscellaneos"

interface FilesGridProps {
  files: ITaskResource[]
}

// This shouldn't be hardcoded lol
const BASE_URL = "http://localhost:3000"

const StyledFileIcon = styled("div")(() => ({
  width: "100%",
  height: 185,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F0F0F0",
  borderRadius: "4px",
  fontWeight: "bold",
  fontSize: "20px",
  color: "#555",
}))

const handleDownload = (path: string) => downloadFile(BASE_URL, path)
const handleOpen = (path: string) => {
  const fileUrl = `${BASE_URL}${path}`
  window.open(fileUrl, "_blank")
}

export default function FilesGrid({ files }: FilesGridProps) {
  return (
    <Box>
      <Grid container spacing={2} padding={2}>
        {files.map((file, index) => (
          <Card
            key={index}
            sx={{ maxWidth: "30%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea
              sx={{ flexGrow: 1 }}
              onClick={() => handleOpen(file.path)}
            >
              {file.mimetype?.startsWith("image/") ? (
                <CardMedia
                  component="img"
                  image={`${BASE_URL}${file.path}`}
                  alt="green iguana"
                />
              ) : (
                <StyledFileIcon>
                  <span>
                    {file.originalName
                      ? "." + file.originalName.split(".").pop()?.toUpperCase()
                      : "attachment"}
                  </span>
                </StyledFileIcon>
              )}
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  {file.originalName}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                startIcon={<CloudDownload />}
                onClick={() => handleDownload(file.path)}
              >
                Download
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </Box>
  )
}
