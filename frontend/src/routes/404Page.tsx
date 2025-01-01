import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  const goHome = () => {
    navigate("/")
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Typography variant="h1" color="error" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" mb={3}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={goHome}>
        Go Back Home
      </Button>
    </Box>
  )
}
