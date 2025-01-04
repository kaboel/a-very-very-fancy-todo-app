import { configureStore } from "@reduxjs/toolkit"
import { tasksApi } from "./apis/tasksApi"
import { usersApi } from "./apis/usersApi"
import { patientsApi } from "./apis/patientApi"
import { authApi } from "./apis/authApi"
import { authSlice } from "./slices/authSlice"
import { usersSlice } from "./slices/usersSlice"
import { tasksSlice } from "./slices/tasksSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    tasks: tasksSlice.reducer,
    // APIs
    [authApi.reducerPath]: authApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [patientsApi.reducerPath]: patientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(tasksApi.middleware)
      .concat(usersApi.middleware)
      .concat(patientsApi.middleware)
      .concat(authApi.middleware)
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
