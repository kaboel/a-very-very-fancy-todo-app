import {
  Avatar,
  Box,
  Typography,
  Chip,
  Grid2 as Grid,
  IconButton,
  Tooltip,
} from "@mui/material"
import { USER_ROLES } from "../helpers/constants"
import { initials, stringToColor } from "../helpers/miscellaneos"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { useNavigate } from "react-router"
import { IUser } from "../helpers/types"
import { logout } from "../redux/slices/authSlice"
import { useDispatch } from "react-redux"

interface ProfileBoxProps {
  loading: boolean
  profile: IUser
}

export default function ProfileBox({ profile }: ProfileBoxProps) {
  const dispatch = useDispatch()
  const { name, email, role, doctorNumber } = profile

  const handleLogout = () => {
    dispatch(logout())
    navigate("/auth/login")
  }

  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 3,
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          bgcolor: stringToColor(name),
          width: 100,
          height: 100,
          fontSize: 35,
          mb: 2,
        }}
      >
        {initials(name)}
      </Avatar>
      <Typography variant="h5">{name}</Typography>
      {role === USER_ROLES.DOCTOR && (
        <Chip
          variant="outlined"
          color="primary"
          sx={{ fontWeight: "600", mb: 1, mt: 1 }}
          label={`D-${doctorNumber}`}
        />
      )}
      <Typography variant="body2"> {email} </Typography>
      <Grid container>
        <Grid>
          <Tooltip title="Profile" placement="left">
            <IconButton onClick={() => navigate("/profile")}>
              <ManageAccountsIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Logout" placement="right">
            <IconButton color="error" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  )
}
