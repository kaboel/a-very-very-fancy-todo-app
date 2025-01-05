import {
  Box,
  Button,
  Typography,
  Grid2 as Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Divider,
} from "@mui/material"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../redux/slices/authSlice"
import { Controller, useForm } from "react-hook-form"
import { useUpdateUserMutation } from "../../redux/apis/usersApi"

interface IUserUpdateForm {
  name: string
  email: string
}

export default function ProfilePage() {
  const currentUser = useSelector(selectCurrentUser)
  const [updateUser, { isError }] = useUpdateUserMutation()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserUpdateForm>({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
    },
  })
  const onSubmit = async ({ name, email }: IUserUpdateForm) => {
    await updateUser({
      id: currentUser?.id,
      data: {
        name,
        email,
      },
    })
  }
  return (
    <Box
      sx={{ p: 3, px: 10 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" color="#666">
        Profile
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: "You must have a name.",
          }}
          render={({ field }) => (
            <FormControl sx={{ bgcolor: "white", mb: 2 }} error={!!errors.name}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                label="Name"
                value={field.value}
                onChange={field.onChange}
              />
              {!!errors.name && (
                <Typography variant="caption" color="error">
                  {errors.name.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: "You must have an email address.",
          }}
          render={({ field }) => (
            <FormControl
              sx={{ bgcolor: "white", mb: 2 }}
              error={!!errors.email}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                label="Email"
                value={field.value}
                onChange={field.onChange}
              />
              {!!errors.email && (
                <Typography variant="caption" color="error">
                  {errors.email.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Divider sx={{ mb: 2 }} />
        {isError && (
          <Typography variant="caption" color="error">
            Registration failed. Please try again.
          </Typography>
        )}
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="flex-end">
        <Grid>
          <Button fullWidth variant="contained" type="submit">
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
