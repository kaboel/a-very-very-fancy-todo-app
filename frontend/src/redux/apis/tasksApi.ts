import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { ITask } from "../../helpers/types"

export interface ITaskFilters {
  creatorId?: string
  patientId?: string
  assignedToMe?: boolean
}

export interface IUpsertTaskForm {
  title: string
  description: string
  deadline: Date
  creatorId?: string
  patientId: string
  assigneeIds: string[]
  resources: File[]
}

const generateTags = (result: ITask[] | undefined, type: "Tasks") =>
  result
    ? [...result.map(({ id }) => ({ type, id })), { type, id: "LIST" }]
    : [{ type, id: "LIST" }]

export const tasksApi = createApi({
  reducerPath: "tasksApi",
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
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], ITaskFilters>({
      query: (filters) => {
        const params = new URLSearchParams()
        const { creatorId, patientId, assignedToMe } = filters
        if (creatorId) params.append("creatorId", creatorId)
        if (patientId) params.append("patientId", patientId)
        if (assignedToMe) params.append("assignedToMe", "true")
        return `/tasks?${params.toString()}`
      },
      providesTags: (result) => generateTags(result, "Tasks"),
    }),
    createTask: builder.mutation<void, FormData>({
      query: (payload) => ({
        url: "tasks",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation } = tasksApi
