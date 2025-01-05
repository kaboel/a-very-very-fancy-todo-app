import { configureStore, combineReducers, Action } from "@reduxjs/toolkit"
import { authSlice } from "./slices/authSlice"
import { usersSlice } from "./slices/usersSlice"
import { tasksSlice } from "./slices/tasksSlice"
import { authApi } from "./apis/authApi"
import { tasksApi } from "./apis/tasksApi"
import { usersApi } from "./apis/usersApi"
import { patientsApi } from "./apis/patientApi"
import { patientsSlice } from "./slices/patientsSlice"

const appReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
  tasks: tasksSlice.reducer,
  patients: patientsSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [patientsApi.reducerPath]: patientsApi.reducer,
})

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: Action
) => {
  if (action.type === "auth/logout") {
    state = undefined // Clear all state on logout
  }
  return appReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(tasksApi.middleware)
      .concat(usersApi.middleware)
      .concat(patientsApi.middleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
