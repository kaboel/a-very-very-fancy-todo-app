import { useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import {
  FormControl,
  TextField,
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
import { UserRoles } from "../../helpers/constants"

interface IRegisterForm {
  firstname: string
  lastname: string
  email: string
  password: string
  role: UserRoles | ""
  passwordConfirmation: string
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      role: "",
    },
  })
  const navigate = useNavigate()

  const onSubmit = (data: IRegisterForm) => {
    console.log("Register successful with", data)
    // Add your authentication logic here (e.g., call an API)
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

        <TextField
          fullWidth
          size="small"
          label="First Name"
          variant="outlined"
          type="text"
          {...register("firstname", {
            required: "We need your First Name",
          })}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          size="small"
          label="Last Name"
          variant="outlined"
          type="text"
          {...register("lastname", {
            required: "We need your Last Name",
          })}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          size="small"
          label="Email"
          variant="outlined"
          type="email"
          {...register("email", {
            required: "We need your Email address",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />

        <FormControl size="small" sx={{ mb: 2 }}>
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            id="role"
            label="Role"
            {...register("role", {
              required: "Please select a role",
            })}
          >
            <MenuItem value="SECRETARY">Secretary</MenuItem>
            <MenuItem value="NURSE">Nurse</MenuItem>
            <MenuItem value="DOCTOR">Doctor</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ mb: 3, mt: 1 }} />

        <FormControl size="small" sx={{ mb: 2 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            endAdornment={passwordAdornment(showPassword, () =>
              setShowPassword((prev) => !prev)
            )}
          />
        </FormControl>

        <FormControl size="small" sx={{ mb: 2 }}>
          <InputLabel htmlFor="passwordConfirm">
            Password Confirmation
          </InputLabel>
          <OutlinedInput
            id="passwordConfirm"
            label="Pasword Confirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            endAdornment={passwordAdornment(showPasswordConfirmation, () =>
              setShowPasswordConfirmation((prev) => !prev)
            )}
          />
        </FormControl>

        {/* <TextField
          fullWidth
          size="small"
          label="Password"
          variant="outlined"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        /> */}
        {/* 
        <TextField
          fullWidth
          size="small"
          label="Password Confirmation"
          variant="outlined"
          type="password"
          {...register("passwordConfirmation", {
            required: "Password Confirmation is required",
          })}
          error={!!errors.passwordConfirmation}
          helperText={errors.passwordConfirmation?.message}
          sx={{ mb: 4 }}
        /> */}

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Create account
        </Button>
      </Box>
    </AuthPaper>
  )
}

export default RegisterPage
