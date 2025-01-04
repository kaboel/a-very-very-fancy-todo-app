import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../helpers/types"
import { usersApi } from "../apis/usersApi"
import { RootState } from "../store"

interface UsersState {
  list: IUser[]
}

const initialState: UsersState = {
  list: [],
}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        state.list = payload
      }
    )
  },
})

export const selectUsers = (state: RootState) => state.users.list
