import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid2 as Grid,
} from "@mui/material"
import AuthPaper from "../../components/AuthPaper"

interface ILoginForm {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>()

  const onSubmit = (data: ILoginForm) => {
    console.log("Login successful with", data)
    // Add your authentication logic here (e.g., call an API)
  }

  return (
    <AuthPaper>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        />

        {/* Submit Button */}
        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>

        {/* Additional links */}
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <a href="#" onClick={() => navigate("/auth/register")}>
                Sign up here
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </AuthPaper>
  )
}

export default Login
