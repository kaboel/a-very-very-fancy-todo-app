import {
  Box,
  Button,
  FormControl,
  Grid2 as Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Tooltip,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router"
import TaskItem from "../../../components/TaskItem"
import Add from "@mui/icons-material/Add"
import Tune from "@mui/icons-material/Tune"
import { useGetTasksQuery } from "../../../redux/apis/tasksApi"
import { ITask, IUser } from "../../../helpers/types"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../redux/slices/authSlice"
import { selectTasks } from "../../../redux/slices/tasksSlice"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { selectUsers } from "../../../redux/slices/usersSlice"

interface ITaskFilterForm {
  assigneeIds: string[]
  assignerIds: string[]
  patientIds: string[]
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #CCC",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default function TasksPage() {
  const navigate = useNavigate()
  const [tunerOpen, setTunerOpen] = useState(false)
  const currentUser = useSelector(selectCurrentUser)
  const { isLoading } = useGetTasksQuery({
    creatorId: currentUser?.id,
    assignedToMe: true,
  })
  const users = useSelector(selectUsers)
  const tasks = useSelector(selectTasks)
  const { control } = useForm<ITaskFilterForm>()

  return (
    <Box>
      <Grid container sx={{ py: 2, px: 4 }}>
        <Grid>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => navigate("/tasks/upsert")}
          >
            Create Task
          </Button>
        </Grid>
        <Grid size="grow" sx={{ textAlign: "right" }}>
          <Tooltip
            title="Filtering and Sorting"
            onClick={() => setTunerOpen((prev: boolean) => !prev)}
          >
            <IconButton>
              <Tune />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Box sx={{ px: 2 }}>
        {isLoading ? (
          <div>Loading tasks...</div>
        ) : (
          tasks?.map((item: ITask) => <TaskItem key={item?.id} task={item} />)
        )}
      </Box>

      <Modal
        open={tunerOpen}
        onClose={() => setTunerOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ mb: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Filter:
            </Typography>
            <Controller
              control={control}
              name="assigneeIds"
              render={({ field }) => (
                <FormControl fullWidth variant="outlined">
                  <InputLabel size="small" id="assignee-label">
                    Assign to
                  </InputLabel>
                  <Select
                    labelId="assignee-label"
                    multiple
                    size="small"
                    value={field.value}
                    onChange={field.onChange}
                    sx={{ bgcolor: "white", mb: 2 }}
                    input={<OutlinedInput label="Assignees" />}
                    renderValue={(selected) => {
                      const names = selected.map((id) => {
                        const user = users?.find((user) => user.id === id)
                        return user ? user.name : ""
                      })
                      return names.join(", ")
                    }}
                    MenuProps={MenuProps}
                  >
                    {users?.map((user: IUser) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
