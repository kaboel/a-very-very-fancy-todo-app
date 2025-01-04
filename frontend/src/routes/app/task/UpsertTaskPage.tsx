import { useNavigate } from "react-router"
import { useForm, Controller } from "react-hook-form"
import {
  IUpsertTaskForm,
  useCreateTaskMutation,
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
import { IPatient, IUser } from "../../../helpers/types"
import { useGetPatientsQuery } from "../../../redux/apis/patientApi"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../redux/slices/authSlice"

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
  const { data: users } = useGetUsersQuery()
  const { data: patients } = useGetPatientsQuery()
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpsertTaskForm>({
    defaultValues: {
      deadline: new Date(),
      assigneeIds: [],
      patientId: "",
      resources: [],
    },
  })
  const [createTask, { isLoading }] = useCreateTaskMutation()
  const onSubmit = async (data: IUpsertTaskForm) => {
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
      await createTask(formData)
      navigate("/")
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  return (
    <Box
      sx={{ p: 3, px: 10 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" color="#666">
        Create task
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
              onFilesSelect={(prevSelection) => field.onChange(prevSelection)}
            />
          )}
        />
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="flex-end">
        <Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
          >
            Create
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
