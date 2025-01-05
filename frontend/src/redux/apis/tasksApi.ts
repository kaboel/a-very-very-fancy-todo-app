import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { ITask } from "../../helpers/types"

export interface ITaskFilters {
  creatorId?: string
  patientId?: string
  assignedToMe?: boolean
}

export interface IUpsertTask {
  title: string
  description: string
  deadline: Date
  creatorId?: string
  patientId: string
  assigneeIds: string[]
  resources: File[]
}

interface ITaskUpdate {
  id: string
  data: FormData
}

interface ITaskMarkComplete {
  id: string
}

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/tasks",
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
        return `/?${params.toString()}`
      },
      providesTags: ["Tasks"],
    }),
    getSummary: builder.query<ITask[], { id: string }>({
      query: ({ id }) => ({
        url: `/${id}/summary`,
      }),
    }),
    createTask: builder.mutation<void, FormData>({
      query: (payload) => ({
        url: "/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<ITask, ITaskUpdate>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    markComplete: builder.mutation<ITask, ITaskMarkComplete>({
      query: ({ id }) => ({
        url: `/${id}/mark`,
        method: "PUT",
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetSummaryQuery,
  useCreateTaskMutation,
  useMarkCompleteMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi
