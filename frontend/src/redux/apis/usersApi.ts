import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { IUser } from "../../helpers/types"

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/users",
    }),
  }),
})

export const { useGetUsersQuery } = usersApi
