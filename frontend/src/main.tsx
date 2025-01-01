import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { StyledEngineProvider, CssBaseline } from "@mui/material"
import "./styles/index.css"
import App from "./App.tsx"

const root = document.getElementById("root")

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <CssBaseline />
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
)
