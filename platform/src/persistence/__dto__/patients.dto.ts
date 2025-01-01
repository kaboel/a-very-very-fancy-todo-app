export type IPatientCreate = {
  firstname: string
  lastname: string
}

export type IPatientUpdate = {
  id: string
  firstname?: string
  lastname?: string
}
