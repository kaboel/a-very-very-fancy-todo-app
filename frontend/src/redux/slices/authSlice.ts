import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../../helpers/types"
import { RootState } from "../store"
import { authApi } from "../apis/authApi"

interface AuthState {
  user: IUser | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
}

const handleAuthFulfilled = (
  state: AuthState,
  { payload }: PayloadAction<{ user: IUser; token: string }>
) => {
  state.user = payload.user
  state.token = payload.token
  localStorage.setItem("token", payload.token)
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.validateToken.matchFulfilled,
      handleAuthFulfilled
    )
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      handleAuthFulfilled
    )
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      handleAuthFulfilled
    )
  },
})

export const { logout } = authSlice.actions
export const selectIsAuthenticated = (state: RootState) => state.auth.token
export const selectCurrentUser = (state: RootState) => state.auth.user
