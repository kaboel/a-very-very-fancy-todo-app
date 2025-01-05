import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { IUser } from "../../helpers/types"

interface IUpdateUserRequest {
  id?: string
  data: {
    name?: string
    email?: string
  }
}

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
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<IUser, IUpdateUserRequest>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
})

export const { useGetUsersQuery, useUpdateUserMutation } = usersApi
