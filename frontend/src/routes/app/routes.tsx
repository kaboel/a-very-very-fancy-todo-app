import { Routes, Route, Navigate } from "react-router"
import DashboardPage from "../DashboardPage"
import TasksPage from "./task/TasksPage"
import PatientsPage from "./patient/PatientsPage"
import ProfilePage from "./ProfilePage"
import NotFound from "../404Page"
import UpsertTaskPage from "./task/UpsertTaskPage"
import UpsertPatientPage from "./patient/UpsertPatientsPage"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" replace />} />

      {/* Dashboard (Main App Layout) */}
      <Route path="/" element={<DashboardPage />}>
        {/* Nested Routes */}
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/upsert" element={<UpsertTaskPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="patients/upsert" element={<UpsertPatientPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
