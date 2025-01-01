import SwaggerParser from "@apidevtools/swagger-parser"
import path from "path"

describe("API Specs Test", () => {
  it("should be a valid OpenAPI spec", async () => {
    const specPath = path.resolve(__dirname, "./index.yaml")
    await expect(SwaggerParser.validate(specPath)).resolves.toBeTruthy()
  })
})
