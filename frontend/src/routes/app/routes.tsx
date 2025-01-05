import { Routes, Route, Navigate } from "react-router"
import DashboardPage from "../DashboardPage"
import TasksPage from "./task/TasksPage"
import PatientsPage from "./patient/PatientsPage"
import ProfilePage from "./ProfilePage"
import UpsertTaskPage from "./task/UpsertTaskPage"
import UpsertPatientPage from "./patient/UpsertPatientsPage"
import TaskViewPage from "./task/TaskViewPage"
import UpdateTaskPage from "./task/UpdateTaskPage"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" replace />} />
      <Route path="/" element={<DashboardPage />}>
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/:id" element={<TaskViewPage />} />
        <Route path="tasks/:id/edit" element={<UpdateTaskPage />} />
        <Route path="tasks/upsert" element={<UpsertTaskPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="patients/:id/edit" element={<UpsertPatientPage />} />
        <Route path="patients/upsert" element={<UpsertPatientPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
