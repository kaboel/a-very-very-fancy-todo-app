import { Avatar, Box, Typography, Chip, Skeleton } from "@mui/material"
import { UserRoles } from "../helpers/constants"
import { stringToColor } from "../helpers/miscellaneos"

interface IUserProfile {
  firstname: string
  lastname: string
  email: string
  role: UserRoles
  doctorNumber?: number
}

interface ProfileBoxProps {
  loading: boolean
  profile: IUserProfile
}

export default function ProfileBox({ loading, profile }: ProfileBoxProps) {
  const { firstname, lastname, email, role } = profile
  const fullname = `${firstname} ${lastname}`
  const initials = `${firstname[0]}${lastname[0]}`

  return !loading ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 5,
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          bgColor: stringToColor(fullname),
          width: 100,
          height: 100,
          fontSize: 35,
          mb: 2,
        }}
      >
        {initials}
      </Avatar>
      <Typography variant="h5">{fullname}</Typography>
      {role === UserRoles.DOCTOR && (
        <Chip
          variant="outlined"
          color="primary"
          sx={{ fontWeight: "600", mb: 1, mt: 1 }}
          label="Doctor"
        />
      )}
      <Typography variant="body2"> {email} </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 5,
        alignItems: "center",
      }}
    >
      <Skeleton variant="circular" width={100} height={100} sx={{ mb: 2 }} />
      <Skeleton width={120} height={40} />
      <Skeleton width={100} height={40} sx={{ mt: 1, mb: 1 }} />
      <Skeleton width={200} />
    </Box>
  )
}
