import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { StyledEngineProvider, CssBaseline } from "@mui/material"
import "./styles/index.css"
import App from "./App.tsx"

const root = document.getElementById("root")

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
)
