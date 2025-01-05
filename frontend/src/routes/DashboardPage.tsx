import { Outlet } from "react-router"
import { Box, Divider, Grid2 as Grid, Paper, styled } from "@mui/material"
import HomePaper from "../components/HomePaper"
import ProfileBox from "../components/ProfileBox"
import Navigation from "../components/Navigation"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../redux/slices/authSlice"
import { useGetUsersQuery } from "../redux/apis/usersApi"

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "700px",
}))

export default function DashboardPage() {
  const { isLoading } = useGetUsersQuery()
  const userData = useSelector(selectCurrentUser)

  return !userData || isLoading ? (
    <div>Loading...</div>
  ) : (
    <HomePaper>
      <Grid container padding={0}>
        <Grid size="grow">
          <StyledPaper>
            <ProfileBox loading={false} profile={userData} />
            <Divider />
            <Navigation />
          </StyledPaper>
        </Grid>
        <Grid size={9}>
          <Box sx={{ p: 1, px: 2, maxHeight: "700px", overflowY: "auto" }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </HomePaper>
  )
}
