import { useState } from "react"
import { useNavigate } from "react-router"
import { Controller, useForm } from "react-hook-form"
import {
  FormControl,
  Button,
  Box,
  Typography,
  Grid2 as Grid,
  Divider,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material"
import ArrowBackIosNewRounded from "@mui/icons-material/ArrowBackIosNewRounded"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import AuthPaper from "../../components/AuthPaper"
import { IUserRole } from "../../helpers/types"
import { fullName } from "../../helpers/miscellaneos"
import { useRegisterMutation } from "../../redux/apis/authApi"

interface IRegisterForm {
  firstname: string
  lastname: string
  email: string
  role: IUserRole
  password: string
  passwordConfirmation: string
}

const RegisterPage = () => {
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      role: "doctor",
    },
  })
  const navigate = useNavigate()
  const [register, { isError }] = useRegisterMutation()

  const onSubmit = async ({
    firstname,
    lastname,
    email,
    role,
    password,
  }: IRegisterForm) => {
    const name = fullName(firstname, lastname)
    await register({ name, email, role, password })
    navigate("/")
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)

  const passwordAdornment = (
    show: boolean,
    handler: () => void
  ): JSX.Element => (
    <InputAdornment position="end">
      <IconButton
        aria-label={showPassword ? "hide the password" : "display the password"}
        onClick={handler}
        edge="end"
      >
        {show ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  )

  return (
    <AuthPaper>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Grid container spacing={0} sx={{ padding: 0, mb: 1 }}>
          <Grid size={2}>
            <IconButton
              color="primary"
              size="large"
              onClick={() => navigate("/auth/login")}
            >
              <ArrowBackIosNewRounded fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid size="grow" sx={{ alignItems: "center", display: "flex" }}>
            <Typography
              gutterBottom
              variant="h5"
              sx={{
                mb: 0,
                width: "100%",
                textAlign: "right",
                color: "darkgray",
              }}
            >
              Create an account
            </Typography>
          </Grid>
        </Grid>
        <Controller
          control={control}
          name="firstname"
          rules={{
            required: "We need your first name",
          }}
          render={({ field }) => (
            <FormControl error={!!errors.firstname} size="small" sx={{ mb: 2 }}>
              <InputLabel htmlFor="firstname">First Name</InputLabel>
              <OutlinedInput
                id="firstname"
                label="First Name"
                value={field.value}
                onChange={field.onChange}
                type="text"
              />
              {errors.firstname && (
                <Typography variant="caption" color="error">
                  {errors.firstname.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="lastname"
          rules={{
            required: "We need your last name",
          }}
          render={({ field }) => (
            <FormControl error={!!errors.lastname} size="small" sx={{ mb: 2 }}>
              <InputLabel htmlFor="lastname">Last Name</InputLabel>
              <OutlinedInput
                id="lastname"
                label="Last Name"
                value={field.value}
                onChange={field.onChange}
                type="text"
              />
              {errors.lastname && (
                <Typography variant="caption" color="error">
                  {errors.lastname.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Please enter a valid email address",
            },
          }}
          render={({ field }) => (
            <FormControl error={!!errors.email} size="small" sx={{ mb: 2 }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                label="Email"
                value={field.value}
                onChange={field.onChange}
                type="text"
              />
              {errors.email && (
                <Typography variant="caption" color="error">
                  {errors.email.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <FormControl size="small" sx={{ mb: 2 }}>
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select id="role" label="Role" {...field}>
                <MenuItem value="secretary">Secretary</MenuItem>
                <MenuItem value="nurse">Nurse</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Divider sx={{ mb: 3, mt: 1 }} />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field }) => (
            <FormControl size="small" sx={{ mb: 2 }} error={!!errors.password}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                label="Pasword"
                value={field.value}
                onChange={field.onChange}
                type={showPassword ? "text" : "password"}
                endAdornment={passwordAdornment(showPassword, () =>
                  setShowPassword((prev) => !prev)
                )}
              />
              {errors.password && (
                <Typography variant="caption" color="error">
                  {errors.password.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="passwordConfirmation"
          rules={{
            required: true,
            validate: (value) =>
              value === getValues("password") || "Passwords do not match!",
          }}
          render={({ field }) => (
            <FormControl
              size="small"
              sx={{ mb: 1 }}
              error={!!errors.passwordConfirmation}
            >
              <InputLabel htmlFor="passwordConfirm">
                Password Confirmation
              </InputLabel>
              <OutlinedInput
                id="passwordConfirm"
                label="Pasword Confirmation"
                value={field.value}
                onChange={field.onChange}
                type={showPasswordConfirmation ? "text" : "password"}
                endAdornment={passwordAdornment(showPasswordConfirmation, () =>
                  setShowPasswordConfirmation((prev) => !prev)
                )}
              />
              {errors.passwordConfirmation && (
                <Typography variant="caption" color="error">
                  {errors.passwordConfirmation.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Divider sx={{ mb: 3, mt: 2 }} />
        {isError && (
          <Typography variant="caption" color="error">
            Registration failed. Please try again.
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          // disabled={!isValid}
        >
          Create account
        </Button>
      </Box>
    </AuthPaper>
  )
}

export default RegisterPage
