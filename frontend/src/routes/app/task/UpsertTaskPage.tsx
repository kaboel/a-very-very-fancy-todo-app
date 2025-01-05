import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useForm, Controller } from "react-hook-form"
import {
  IUpsertTask,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../../redux/apis/tasksApi"
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid2 as Grid,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material"
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import FileSelector from "../../../components/FileSelector"
import { useGetUsersQuery } from "../../../redux/apis/usersApi"
import { IPatient, ITaskResource, IUser } from "../../../helpers/types"
import { useGetPatientsQuery } from "../../../redux/apis/patientApi"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../../redux/slices/authSlice"
import { RootState } from "../../../redux/store"
import { selectTask, updateTask } from "../../../redux/slices/tasksSlice"

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

export default function UpsertTaskPage() {
  const { id: taskId } = useParams<{ id: string }>()
  const task = useSelector((state: RootState) =>
    selectTask(state, taskId || "")
  )

  const { data: users } = useGetUsersQuery()
  const { data: patients } = useGetPatientsQuery()
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [filesToDelete, setFilesToDelete] = useState<ITaskResource[]>([])

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpsertTask>({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      deadline: new Date(task?.deadline || Date.now()),
      assigneeIds: task?.assignments?.map((el) => el.userId) || [],
      patientId: task?.patientId || "",
      resources: [],
    },
  })

  const [createTask, { isError: createError }] = useCreateTaskMutation()
  const [updateTaskRemote, { isError: updateError }] = useUpdateTaskMutation()

  const onSubmit = async (data: IUpsertTask) => {
    try {
      const formData = new FormData()
      formData.append("creatorId", currentUser?.id || "")
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("deadline", data.deadline.toISOString())
      formData.append("patientId", data.patientId)
      data.assigneeIds.forEach((assigneeId) =>
        formData.append("assigneeIds[]", assigneeId)
      )
      data.resources.forEach((resource) =>
        formData.append("resources", resource)
      )
      if (!taskId) {
        await createTask(formData).unwrap()
        navigate("/")
      } else {
        filesToDelete.forEach((resource) =>
          formData.append("resourceIdsToDelete[]", resource.id)
        )
        const updated = await updateTaskRemote({
          id: taskId || "",
          data: formData,
        }).unwrap()
        dispatch(updateTask(updated))
        navigate(`/tasks/${taskId}`)
      }
    } catch (error) {
      console.error("Upsert Operation Error:", error)
    }
  }

  return (
    <Box
      sx={{ p: 3, px: 10 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" color="#666">
        {!taskId ? "Create " : "Update "} Task
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
        <TextField
          sx={{ bgcolor: "white", mb: 2 }}
          label="Title"
          {...register("title", { required: true })}
          error={!!errors.title}
          helperText={errors.title ? "Title is required" : ""}
          size="small"
        />
        <TextField
          sx={{ bgcolor: "white", mb: 2 }}
          label="Description"
          {...register("description")}
          size="small"
        />
        <Controller
          control={control}
          name="deadline"
          rules={{ required: true }}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Deadline"
                value={field.value}
                inputRef={field.ref}
                onChange={(newVal) => field.onChange(newVal)}
                sx={{ mb: 2, bgcolor: "white", width: "300px" }}
                slotProps={{
                  textField: { size: "small" },
                }}
              />
            </LocalizationProvider>
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
                value={field.value}
                onChange={field.onChange}
                sx={{ bgcolor: "white", mb: 2 }}
                input={<OutlinedInput label="Related Patient" />}
                MenuProps={MenuProps}
              >
                {patients?.map((patient: IPatient) => (
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

        <Controller
          control={control}
          name="resources"
          render={({ field }) => (
            <FileSelector
              existingFiles={task?.resources?.filter(
                (resource) =>
                  !filesToDelete.some((toDelete) => toDelete.id === resource.id)
              )}
              onFilesSelect={(prevSelection) => field.onChange(prevSelection)}
              onFileDelete={(file) =>
                setFilesToDelete((prev) => [...prev, file])
              }
            />
          )}
        />

        {createError && (
          <Typography variant="caption" color="error">
            Creation failed. Please try again.
          </Typography>
        )}
        {updateError && (
          <Typography variant="caption" color="error">
            Update failed. Please try again.
          </Typography>
        )}
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="flex-end">
        <Grid>
          <Button type="submit" fullWidth variant="contained">
            Save
          </Button>
        </Grid>
        <Grid>
          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
