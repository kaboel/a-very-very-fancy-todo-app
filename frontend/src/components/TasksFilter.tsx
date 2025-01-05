import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { IPatient, ITaskStatus, IUser } from "../helpers/types"
import { useSelector } from "react-redux"
import { selectUsers } from "../redux/slices/usersSlice"
import { selectPatients } from "../redux/slices/patientsSlice"
import { useEffect, useMemo, useState } from "react"
import { TASK_STATUS } from "../helpers/constants"

export interface ITasksFilter {
  creatorId?: string
  assigneeId?: string
  patientId?: string
  status?: ITaskStatus | string
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

export default function TasksFilter({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: ITasksFilter) => void
}) {
  // const currentUser = useSelector(selectCurrentUser)
  const users = useSelector(selectUsers)
  const sortedUsers = useMemo(
    () => users?.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  )
  const patients = useSelector(selectPatients)
  const sortedPatients = useMemo(
    () => patients?.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [patients]
  )

  const [localFilter, setLocalFilter] = useState<ITasksFilter>({
    creatorId: "",
    assigneeId: "",
    patientId: "",
  })

  const { control, handleSubmit, reset, setValue } = useForm<ITasksFilter>({
    defaultValues: localFilter,
  })

  useEffect(() => {
    reset(localFilter)
  }, [localFilter, reset])

  const onSubmit = (data: ITasksFilter) => {
    setLocalFilter(data)
    onApply(data)
    onClose()
  }
  const onResetClick = () => {
    setValue("creatorId", "")
    setValue("assigneeId", "")
    setValue("patientId", "")
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" sx={{ mb: 2 }}>
          Filter by:
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="creatorId"
            render={({ field }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel size="small" id="creator">
                  Creator
                </InputLabel>
                <Select
                  labelId="creator"
                  size="small"
                  value={field.value || ""}
                  onChange={field.onChange}
                  sx={{ bgcolor: "white", mb: 2 }}
                  input={<OutlinedInput label="Creator" />}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="" sx={{ fontWeight: "bold" }}>
                    All Users
                  </MenuItem>
                  {sortedUsers.map((user: IUser) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="assigneeId"
            render={({ field }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel size="small" id="assignee">
                  Assignee
                </InputLabel>
                <Select
                  labelId="assignee"
                  size="small"
                  value={field.value || ""}
                  onChange={field.onChange}
                  sx={{ bgcolor: "white", mb: 2 }}
                  input={<OutlinedInput label="Assignee" />}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="" sx={{ fontWeight: "bold" }}>
                    All Users
                  </MenuItem>
                  {sortedUsers.map((user: IUser) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="patientId"
            render={({ field }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel size="small" id="patient-label">
                  Related Patient
                </InputLabel>
                <Select
                  labelId="patient-label"
                  size="small"
                  value={field.value || ""}
                  onChange={field.onChange}
                  sx={{ bgcolor: "white", mb: 2 }}
                  input={<OutlinedInput label="Patient" />}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="" sx={{ fontWeight: "bold" }}>
                    All Patients
                  </MenuItem>
                  {sortedPatients.map((patient: IPatient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel size="small" id="status">
                  Task Status
                </InputLabel>
                <Select
                  labelId="status"
                  size="small"
                  value={field.value || ""}
                  onChange={field.onChange}
                  sx={{ bgcolor: "white", mb: 2 }}
                  input={<OutlinedInput label="Task Status" />}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="" sx={{ fontWeight: "bold" }}>
                    All Status
                  </MenuItem>
                  <MenuItem value={TASK_STATUS.NEW}>New</MenuItem>
                  <MenuItem value={TASK_STATUS.COMPLETE}>Complete</MenuItem>
                  <MenuItem value={TASK_STATUS.OVERDUE}>Overdue</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={onResetClick} variant="outlined">
              Reset
            </Button>
            <Button type="submit" variant="contained">
              Apply
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}
