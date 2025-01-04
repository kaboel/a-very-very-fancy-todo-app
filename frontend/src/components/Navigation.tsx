import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation"
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck"

import { useNavigate } from "react-router"

export default function Navigation() {
  const navigate = useNavigate()
  const navItems = [
    {
      title: "Tasks",
      renderIcon: () => <PlaylistAddCheckIcon />,
      handleClick: () => navigate("/tasks"),
    },
    {
      title: "Patients",
      renderIcon: () => <MedicalInformationIcon />,
      handleClick: () => navigate("/patients"),
    },
  ]

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {navItems.map((item, key) => (
            <ListItem disablePadding key={key} onClick={item.handleClick}>
              <ListItemButton>
                <ListItemIcon>{item.renderIcon()}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  )
}
