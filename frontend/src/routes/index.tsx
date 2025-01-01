import { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import AuthRoutes from "./auth/routes"
import NotFoundPage from "./404Page"
import DashboardPage from "./DashboardPage"

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/" element={<DashboardPage />}></Route>

          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </Router>
  )
}
