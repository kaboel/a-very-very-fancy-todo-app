import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid2 as Grid,
  Alert,
  CircularProgress,
} from "@mui/material"
import AuthPaper from "../../components/AuthPaper"
import { useState } from "react"
import { useLoginMutation } from "../../redux/apis/authApi"

interface ILoginForm {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [login, { isLoading, isError }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>()

  const onSubmit = async (data: ILoginForm) => {
    try {
      await login(data)
      if (isError) {
        setError("Invalid email or password.")
        return
      }
      navigate("/")
    } catch (error) {
      console.error(error)
    }
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

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{ position: "relative" }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </Button>

        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <Link to="/auth/register" style={{ textDecoration: "none" }}>
                Sign up here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </AuthPaper>
  )
}

export default Login
