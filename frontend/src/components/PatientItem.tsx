import { IPatient } from "../helpers/types"
import {
  Avatar,
  Chip,
  Divider,
  Grid2 as Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../redux/slices/authSlice"
import { USER_ROLES } from "../helpers/constants"
import { selectUsers } from "../redux/slices/usersSlice"
import { useMemo } from "react"

export default function PatientItem({ patient }: { patient: IPatient }) {
  const currentUser = useSelector(selectCurrentUser)
  const users = useSelector(selectUsers)
  const doctors = useMemo(
    () => users.filter((user) => user.role === USER_ROLES.DOCTOR),
    [users]
  )
  const patientDoctors = patient?.doctors?.map((doctor) => {
    return doctors.find((doc) => doc.id === doctor.doctorId)
  })

  return (
    <Grid size={3} sx={{ display: "flex" }}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Grid>
            <IconButton sx={{ m: 0 }}>
              <Edit />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton sx={{ m: 0 }}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
        <Avatar sx={{ width: 60, height: 60, mb: 2 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
          {patient.name}
        </Typography>
        <Typography variant="caption">{patient.phone}</Typography>
        <Typography variant="body2">{patient.address}</Typography>
        <Divider sx={{ my: 1, width: "100%" }} />
        <Typography variant="caption" sx={{ color: "#CCC" }}>
          Doctors
        </Typography>
        {patientDoctors?.map((pDoc, index) => (
          <Chip
            key={index}
            color="primary"
            variant={pDoc?.id === currentUser?.id ? "filled" : "outlined"}
            label={pDoc?.name}
          />
        ))}
      </Paper>
    </Grid>
  )
}
