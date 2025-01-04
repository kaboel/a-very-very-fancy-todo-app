import { Routes, Route } from "react-router"
import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import NotFound from "../404Page"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      {/* Catch-all for invalid auth routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AuthRoutes
