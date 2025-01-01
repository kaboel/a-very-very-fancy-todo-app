import { Box, Grid2 as Grid, Paper, styled } from "@mui/material"
import HomePaper from "../components/HomePaper"
import ProfileBox from "../components/ProfileBox"
import { UserRoles } from "../helpers/constants"

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "700px",
}))

export default function DashboardPage() {
  const userData = {
    firstname: "Faiq",
    lastname: "Allam",
    email: "faiqxallam@gmail.com",
    role: UserRoles.DOCTOR,
    doctorNumber: 2241234,
  }

  return (
    <HomePaper>
      <Grid container spacing={1} padding={0}>
        <Grid size="grow">
          <StyledPaper>
            <ProfileBox loading={true} profile={userData} />
          </StyledPaper>
        </Grid>
        <Grid size={9}>
          <Box>ContentSection</Box>
        </Grid>
      </Grid>
    </HomePaper>
  )
}
