import { faker } from "@faker-js/faker"

export function generateDoctorNumber() {
  return faker.number.int({ min: 10000, max: 99999 })
}
