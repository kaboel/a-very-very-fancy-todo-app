import React from "react"
import { Routes, Route } from "react-router"

const LoginPage = React.lazy(() => import("./LoginPage"))
const RegisterPage = React.lazy(() => import("./RegisterPage"))

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  )
}
