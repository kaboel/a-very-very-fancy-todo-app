import { Box, Button, Grid2 as Grid, IconButton } from "@mui/material"
import { Add, Tune } from "@mui/icons-material"
import { useNavigate } from "react-router"
import { useGetPatientsQuery } from "../../../redux/apis/patientApi"
import PatientItem from "../../../components/PatientItem"

export default function PatientsPage() {
  const { data: patients, isLoading } = useGetPatientsQuery()
  const navigate = useNavigate()

  return (
    <Box>
      <Grid container sx={{ py: 2, px: 4 }}>
        <Grid>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => navigate("/patients/upsert")}
          >
            Add Patient
          </Button>
        </Grid>
        <Grid size="grow" sx={{ textAlign: "right" }}>
          <IconButton>
            <Tune />
          </IconButton>
        </Grid>
      </Grid>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid container spacing={2} sx={{ p: 2 }}>
          {patients?.map((patient, index) => (
            <PatientItem key={index} patient={patient} />
          ))}
        </Grid>
      )}
    </Box>
  )
}
