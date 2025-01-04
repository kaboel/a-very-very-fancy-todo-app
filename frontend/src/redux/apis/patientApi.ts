import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { IPatient } from "../../helpers/types"

export const patientsApi = createApi({
  reducerPath: "patientsApi",
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
    getPatients: builder.query<IPatient[], void>({
      query: () => "/patients",
    }),
  }),
})

export const { useGetPatientsQuery } = patientsApi
