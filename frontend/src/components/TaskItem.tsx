import {
  Grid2 as Grid,
  IconButton,
  Paper,
  Typography,
  Chip,
} from "@mui/material"
import OpenInFull from "@mui/icons-material/OpenInFull"
import Check from "@mui/icons-material/Check"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../redux/slices/authSlice"
import type { ITask } from "../helpers/types"
import { lightBlue, red } from "@mui/material/colors"
import { formatReadable } from "../helpers/date"
import { TASK_STATUS } from "../helpers/constants"

export default function TaskItem({ task }: { task: ITask }) {
  const currentUser = useSelector(selectCurrentUser)
  const isCreator = task.creatorId === currentUser?.id
  const isAssigned = !!task?.assignments?.find(
    (assignment) => assignment.userId === currentUser?.id
  )
  const completeBtnProps =
    task.status === TASK_STATUS.NEW
      ? {
          color: "primary" as const,
          sx: { bgcolor: lightBlue[100] },
        }
      : task.status === TASK_STATUS.OVERDUE
      ? {
          color: "error" as const,
          sx: { bgcolor: red[100] },
        }
      : {}
  const handleMarkComplete = () => {
    // TODO: handle mark complete
  }
  return (
    <Paper sx={{ my: 1 }}>
      <Grid container spacing={2}>
        <Grid container spacing={1} sx={{ alignItems: "center", py: 1, pl: 2 }}>
          <Grid>
            <IconButton size="small">
              <OpenInFull fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton
              size="large"
              {...completeBtnProps}
              onClick={handleMarkComplete}
            >
              <Check />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          size="grow"
          sx={{
            py: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">{task.title}</Typography>
          {task.status === TASK_STATUS.OVERDUE ? (
            <Typography variant="caption" color="red">
              Overdue
            </Typography>
          ) : (
            <Typography variant="caption">
              {formatReadable(task.deadline)}
            </Typography>
          )}
        </Grid>
        <Grid
          size={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            py: 1,
            px: 1,
          }}
        >
          {isAssigned && (
            <Chip label="Assigned to me" size="small" variant="outlined" />
          )}
          {isCreator && <Chip label="Creator" size="small" sx={{ ml: 1 }} />}
        </Grid>
      </Grid>
    </Paper>
  )
}
