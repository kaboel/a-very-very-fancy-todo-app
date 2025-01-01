import { styled } from "@mui/material"
import AppRoutes from "./routes"

// Outer wrapper with a gradient background
const BaseContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
}))

export default function App() {
  return (
    <BaseContainer>
      <AppRoutes />
    </BaseContainer>
  )
}
