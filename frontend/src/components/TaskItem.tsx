import {
  Grid2 as Grid,
  IconButton,
  Paper,
  Typography,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"
import Check from "@mui/icons-material/Check"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../redux/slices/authSlice"
import type { ITask } from "../helpers/types"
import { lightBlue, red } from "@mui/material/colors"
import { formatReadable } from "../helpers/date"
import { TASK_STATUS } from "../helpers/constants"
import { useState } from "react"
import { useMarkCompleteMutation } from "../redux/apis/tasksApi"
import { useNavigate } from "react-router"
import { RootState } from "../redux/store"
import { selectUser } from "../redux/slices/usersSlice"

export default function TaskItem({ task }: { task: ITask }) {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const taskCreator = useSelector((state: RootState) =>
    selectUser(state, task.creatorId)
  )
  const isComplete = !!task.completed
  const isCreator = task.creatorId === currentUser?.id
  const isAssigned = !!task?.assignments?.find(
    (assignment) => assignment.userId === currentUser?.id
  )
  const [markComplete] = useMarkCompleteMutation()
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

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const handleOpenDialog = () => setDialogIsOpen(true)
  const handleCloseDialog = () => setDialogIsOpen(false)
  const handleMarkComplete = async () => {
    await markComplete({ id: task.id })
    handleCloseDialog()
  }
  return (
    <Box>
      <Paper sx={{ my: 1 }}>
        <Grid container spacing={2}>
          <Grid
            container
            spacing={0}
            sx={{ alignItems: "center", py: 1, pl: 2 }}
          >
            <Grid>
              <IconButton onClick={() => navigate(`/tasks/${task.id}`)}>
                <UnfoldMoreIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid>
              {isComplete ? (
                <Check fontSize="large" />
              ) : (
                <IconButton
                  size="large"
                  {...completeBtnProps}
                  onClick={handleOpenDialog}
                >
                  <Check />
                </IconButton>
              )}
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
            <Typography variant="h5" sx={{ pb: 0, mb: 0 }}>
              {task.title}
            </Typography>
            <Typography variant="caption" color="primary">
              By {taskCreator?.name}
            </Typography>
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

      <Dialog open={dialogIsOpen} onClose={handleCloseDialog}>
        <DialogTitle id="logout-dialog-title">
          Confirm Mark Complete
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6">"{task.title}"</Typography>
          <DialogContentText>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Are you sure you want to mark this task as complete?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleMarkComplete} color="success">
            Mark Complete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
