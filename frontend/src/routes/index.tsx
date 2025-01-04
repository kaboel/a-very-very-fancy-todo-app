import { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router"
import AuthRoutes from "./auth/routes"
import AppRoutes from "./app/routes"
import NotFoundPage from "./404Page"
import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "../redux/slices/authSlice"

export default function MainRoutes() {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/auth/*"
            element={
              !isAuthenticated ? <AuthRoutes /> : <Navigate to="/tasks" />
            }
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? <AppRoutes /> : <Navigate to="/auth/login" />
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
