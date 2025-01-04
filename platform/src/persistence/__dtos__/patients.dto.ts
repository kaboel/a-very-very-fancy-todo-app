export type IPatientGetMany = {
  searchText: string
}

export type IPatientCreate = {
  name: string
  phone: string
  address: string
}

export type IPatientUpdate = {
  id: string
  firstname?: string
  lastname?: string
}
