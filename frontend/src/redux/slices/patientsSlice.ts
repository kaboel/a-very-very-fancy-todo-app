import { createSlice } from "@reduxjs/toolkit"
import { IPatient } from "../../helpers/types"
import { RootState } from "../store"
import { patientsApi } from "../apis/patientApi"

interface PatientState {
  list: IPatient[]
}

const initialState: PatientState = {
  list: [],
}

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      patientsApi.endpoints.getPatients.matchFulfilled,
      (state, { payload }) => {
        state.list = payload
      }
    )
  },
})

export const selectPatient = (state: RootState, patientId: string) =>
  state.patients.list.find((patient) => patient.id === patientId)
