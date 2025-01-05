import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { IPatient } from "../../helpers/types"

interface IPatientCreateReq {
  name: string
  phone: string
  address: string
  doctorIds: string[]
}

interface IPatientUpdateReq {
  id: string
  data: IPatientCreateReq
}

export const patientsApi = createApi({
  reducerPath: "patientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/patients",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Patients"],
  endpoints: (builder) => ({
    getPatients: builder.query<IPatient[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Patients"],
    }),
    createPatient: builder.mutation<void, IPatientCreateReq>({
      query: (payload) => ({
        url: "/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Patients"],
    }),
    updatePatient: builder.mutation<void, IPatientUpdateReq>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Patients"],
    }),
    deletePatient: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Patients"],
    }),
  }),
})

export const {
  useGetPatientsQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientsApi
