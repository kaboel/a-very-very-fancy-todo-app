import {
  Box,
  Button,
  Typography,
  Grid2 as Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material"
import { useNavigate, useParams } from "react-router"
import { useGetUsersQuery } from "../../../redux/apis/usersApi"
import { Controller, useForm } from "react-hook-form"
import { IUser } from "../../../helpers/types"
import { USER_ROLES } from "../../../helpers/constants"
import { useMemo } from "react"
import {
  useCreatePatientMutation,
  useUpdatePatientMutation,
} from "../../../redux/apis/patientApi"
import { useSelector } from "react-redux"
import { selectPatient } from "../../../redux/slices/patientsSlice"
import { RootState } from "../../../redux/store"

interface IUpsertPatientForm {
  id?: string
  name: string
  phone: string
  address: string
  doctorIds: string[]
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

export default function UpsertPatientPage() {
  const { id: patientId } = useParams<{ id: string }>()
  const patient = useSelector((state: RootState) =>
    selectPatient(state, patientId || "")
  )
  //
  const { data: users, isLoading } = useGetUsersQuery()
  const doctors = useMemo(
    () => users?.filter((user) => user.role === USER_ROLES.DOCTOR),
    [users]
  )
  const [createPatient, { isError: createError }] = useCreatePatientMutation()
  const [updatePatient, { isError: updateError }] = useUpdatePatientMutation()

  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpsertPatientForm>({
    defaultValues: {
      name: patient?.name || "",
      phone: patient?.phone || "",
      address: patient?.address || "",
      doctorIds: patient?.doctors?.map((doc) => doc.doctorId) || [],
    },
  })

  const onSubmit = async (data: IUpsertPatientForm) => {
    if (!patientId) {
      await createPatient(data)
    } else {
      await updatePatient({ id: patientId, data })
    }
    navigate("/patients")
  }

  return (
    <Box
      sx={{ p: 3, px: 10 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" color="#666">
        {!patientId ? "Add " : "Update "}
        Patient
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: "We need the patients name",
          }}
          render={({ field }) => (
            <FormControl
              error={!!errors.name}
              size="small"
              sx={{ mb: 2, bgcolor: "white" }}
            >
              <InputLabel htmlFor="name">Patient Name</InputLabel>
              <OutlinedInput
                id="name"
                label="Patient Name"
                value={field.value}
                onChange={field.onChange}
                type="text"
              />
              {errors.name && (
                <Typography variant="caption" color="error">
                  {errors.name.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="phone"
          rules={{
            required: "We need the patients phone number",
          }}
          render={({ field }) => (
            <FormControl
              error={!!errors.phone}
              size="small"
              sx={{ mb: 2, bgcolor: "white" }}
            >
              <InputLabel htmlFor="name">Phone Number</InputLabel>
              <OutlinedInput
                id="phone"
                label="Phone Number"
                value={field.value}
                onChange={field.onChange}
                type="text"
              />
              {errors.phone && (
                <Typography variant="caption" color="error">
                  {errors.phone.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="address"
          rules={{
            required: "We need the patients home address",
          }}
          render={({ field }) => (
            <FormControl
              error={!!errors.address}
              size="small"
              sx={{ mb: 2, bgcolor: "white" }}
            >
              <InputLabel htmlFor="name">Home Address</InputLabel>
              <OutlinedInput
                id="address"
                label="Home Address"
                value={field.value}
                onChange={field.onChange}
                type="text"
              />
              {errors.address && (
                <Typography variant="caption" color="error">
                  {errors.address.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="doctorIds"
          render={({ field }) => (
            <FormControl fullWidth variant="outlined">
              <InputLabel size="small" id="doctors">
                Attending Doctors
              </InputLabel>
              <Select
                labelId="doctors"
                multiple
                size="small"
                value={field.value}
                onChange={field.onChange}
                sx={{ bgcolor: "white", mb: 2 }}
                input={<OutlinedInput label="Attending Doctors" />}
                renderValue={(selected) => {
                  const names = selected.map((id) => {
                    const user = users?.find((user) => user.id === id)
                    return user ? user.name : ""
                  })
                  return names.join(", ")
                }}
                MenuProps={MenuProps}
              >
                {doctors?.map((doctor: IUser) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {createError && (
          <Typography variant="caption" color="error">
            Patient creation failed. Please try again.
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
          >
            Save
          </Button>
        </Grid>
        <Grid>
          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={() => navigate("/patients")}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
