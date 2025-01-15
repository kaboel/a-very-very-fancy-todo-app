import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IUser, IUserRole } from "../../helpers/types"

interface ILoginRequest {
  email: string
  password: string
}

interface IRegisterRequest {
  name: string
  email: string
  role: IUserRole
  password: string
  specialty?: string
}

interface ILoginResponse {
  token: string
  user: IUser
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem("token")
      if (token && endpoint === "validateToken") {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    validateToken: builder.query<ILoginResponse, void>({
      query: () => ({
        url: "/validateToken",
        method: "GET",
        headers: {
          //
        },
      }),
    }),
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
      }),
    }),
    register: builder.mutation<ILoginResponse, IRegisterRequest>({
      query: (payload) => ({
        url: "/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
})

export const { useLoginMutation, useValidateTokenQuery, useRegisterMutation } =
  authApi
