import { faker } from "@faker-js/faker"

export function generateDoctorNumber() {
  return faker.number.int({ min: 1000000, max: 99999999 })
}
