import { format } from "date-fns"

export function formatReadable(date: Date | string) {
  return format(new Date(date), "EEE, d.M.yyyy (HH:mm)")
}

export function formatISO(date: string) {
  const obj = new Date(date)
  console.log(obj)
}
