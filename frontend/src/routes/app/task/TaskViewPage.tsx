import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import {
  selectTask,
  selectTaskAssignees,
} from "../../../redux/slices/tasksSlice"
import { RootState } from "../../../redux/store"
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material"
import Edit from "@mui/icons-material/Edit"
import { formatReadable } from "../../../helpers/date"
import { selectUser } from "../../../redux/slices/usersSlice"
import { selectCurrentUser } from "../../../redux/slices/authSlice"
import FilesGrid from "../../../components/FilesGrid"
import Delete from "@mui/icons-material/Delete"
import Check from "@mui/icons-material/Check"
import {
  useDeleteTaskMutation,
  useMarkCompleteMutation,
} from "../../../redux/apis/tasksApi"
import { useState } from "react"
import { selectPatient } from "../../../redux/slices/patientsSlice"
import { initials, stringToColor } from "../../../helpers/miscellaneos"

export default function TaskViewPage() {
  const navigate = useNavigate()
  const { id: taskId } = useParams<{ id: string }>()
  const user = useSelector(selectCurrentUser)
  const task = useSelector((state: RootState) =>
    selectTask(state, taskId || "")
  )
  const creator = useSelector((state: RootState) =>
    selectUser(state, task?.creatorId || "")
  )
  const patient = useSelector((state: RootState) =>
    selectPatient(state, task?.patientId || "")
  )
  const assignees = useSelector((state: RootState) =>
    selectTaskAssignees(state, taskId || "")
  )
  const isCreator = task?.creatorId === user?.id
  const isCompleted = task?.completed
  const [markComplete, { isLoading }] = useMarkCompleteMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const navigateToEdit = (id: string | undefined) => {
    navigate(`/tasks/${id}/edit`)
  }

  const handleMarkComplete = async () => {
    await markComplete({ id: task?.id || "" })
    navigate("/")
  }

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const handleOpenDialog = () => setDialogIsOpen(true)
  const handleCloseDialog = () => setDialogIsOpen(false)
  const handleDeleteTask = async () => {
    await deleteTask({ id: task?.id || "" }).unwrap()
    navigate("/")
  }

  return (
    <Box sx={{ py: 6, px: 10 }}>
      <Grid container>
        <Grid size="grow">
          <Typography variant="h4">{task?.title}</Typography>
          <Box sx={{ pl: 1, mt: 1 }}>
            <Typography variant="body2">
              Creator: <b>{isCreator ? "Me" : creator?.name}</b>
            </Typography>
            <Typography variant="body2">
              Patient: <b>{patient?.name}</b>
            </Typography>
            <Typography variant="body2">
              Due: <b>{formatReadable(task?.deadline || new Date())}</b>
            </Typography>
          </Box>
        </Grid>
        {isCreator && !isCompleted && (
          <Grid size={2} sx={{ textAlign: "right" }}>
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Disabled button group"
            >
              <Button color="primary" onClick={() => navigateToEdit(task?.id)}>
                <Edit />
              </Button>
              <Button color="error" onClick={handleOpenDialog}>
                <Delete />
              </Button>
            </ButtonGroup>

            {assignees && (
              <Tooltip title={`Assigned to ${assignees.length} people.`}>
                <AvatarGroup max={3} sx={{ mt: 3 }}>
                  {assignees.map((assignee) => (
                    <Avatar
                      sx={{
                        bgcolor: stringToColor(assignee.name),
                        fontSize: "small",
                      }}
                    >
                      {initials(assignee.name)}
                    </Avatar>
                  ))}
                </AvatarGroup>
              </Tooltip>
            )}
          </Grid>
        )}
      </Grid>
      <Paper sx={{ mt: 2, py: 2, px: 4 }}>
        {task?.description ? (
          <Typography variant="body1">{task?.description}</Typography>
        ) : (
          <Typography
            variant="caption"
            sx={{ color: "#CCC", fontStyle: "italic" }}
          >
            No description
          </Typography>
        )}
      </Paper>
      <Paper sx={{ mt: 2, py: 2, px: 4 }}>
        {task?.resources?.length ? (
          <FilesGrid files={task?.resources} />
        ) : (
          <Typography
            variant="caption"
            sx={{ color: "#CCC", fontStyle: "italic" }}
          >
            No resources
          </Typography>
        )}
      </Paper>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<Check />}
          onClick={handleMarkComplete}
          disabled={isLoading || isCompleted}
        >
          {!isCompleted && "Mark "}
          Completed
        </Button>
      </Box>
      {/*  */}
      <Dialog open={dialogIsOpen} onClose={handleCloseDialog}>
        <DialogTitle id="logout-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="h6">"{task?.title}"</Typography>
          <DialogContentText>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Are you sure you want to delete this task?
            </Typography>
            <Typography variant="subtitle2">This cannot be undone!</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteTask} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
