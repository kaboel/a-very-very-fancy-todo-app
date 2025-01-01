const SwaggerParser = require("@apidevtools/swagger-parser")
const fs = require("fs")
const path = require("path")
const yaml = require("js-yaml")

async function bundleOpenApi() {
  try {
    const specPath = path.resolve(__dirname, "../src/api/specs/index.yaml")
    const apiSpec = await SwaggerParser.bundle(specPath)
    const apiSpecYaml = yaml.dump(apiSpec)

    const bundledFilePath = path.resolve(__dirname, "../openapi.yaml")
    fs.writeFileSync(bundledFilePath, apiSpecYaml, "utf8")

    console.log("App: spec bundled!")
  } catch(err) {
    console.log(err)
    console.log("App: error bundling spec")
  }
}

bundleOpenApi()