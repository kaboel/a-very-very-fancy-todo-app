import {
  Box,
  Button,
  TextField,
  Typography,
  Grid2 as Grid,
  Divider,
} from "@mui/material"
import { useNavigate } from "react-router"

export default function ProfilePage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ p: 3, px: 10 }} component="form">
      <Typography variant="h4" color="#666">
        Profile
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
        <TextField sx={{ bgcolor: "white", mb: 2 }} label="Name" />
        <TextField sx={{ bgcolor: "white", mb: 2 }} label="Email" />
        <Divider sx={{ my: 2 }} />
        <TextField sx={{ bgcolor: "white", mb: 2 }} label="Password" />
        <TextField
          sx={{ bgcolor: "white", mb: 2 }}
          label="Password Confirmation"
        />
        Show patients bellow
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="flex-end">
        <Grid>
          <Button fullWidth variant="contained">
            Create
          </Button>
        </Grid>
        <Grid>
          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={() => navigate("/tasks")}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
