import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITask, ITaskStatus } from "../../helpers/types"
import { tasksApi } from "../apis/tasksApi"
import { isBefore, parseISO } from "date-fns"
import { TASK_STATUS } from "../../helpers/constants"
import { RootState } from "../store"

interface TasksState {
  list: ITask[]
}

const initialState: TasksState = {
  list: [],
}

function addTaskStatuses(tasks: ITask[]): ITask[] {
  const now = new Date()

  return tasks.map((task) => {
    const taskDeadline = parseISO(task.deadline as string)

    let status: ITaskStatus
    if (task.completed) {
      status = TASK_STATUS.COMPLETE
    } else if (isBefore(taskDeadline, now)) {
      status = TASK_STATUS.OVERDUE
    } else {
      status = TASK_STATUS.NEW
    }
    return { ...task, status }
  })
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTask(state, action: PayloadAction<ITask>) {
      const index = state.list.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index !== -1) {
        state.list[index] = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      tasksApi.endpoints.getTasks.matchFulfilled,
      (state, { payload }) => {
        state.list = addTaskStatuses(payload)
      }
    )
  },
})

export const { updateTask } = tasksSlice.actions
export const selectTasks = (state: RootState) => state.tasks.list
export const selectTask = (state: RootState, taskId: string) =>
  state.tasks.list.find((task) => task.id === taskId)
export const selectTaskAssignees = (state: RootState, taskId: string) => {
  const task = selectTask(state, taskId)
  const assigneeIds = task?.assignments?.map((assignee) => assignee.userId)
  const users = state.users.list.filter((user) =>
    assigneeIds?.some((assId) => assId === user.id)
  )
  return users
}
