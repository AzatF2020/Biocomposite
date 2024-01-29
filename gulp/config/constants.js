const path = require("path");

const enableImageMinification = true
const isDev = process.env.MODE === "development"
const isProd = process.env.MODE === "production"
const jsonPugFolder = path.join(__dirname, '../../', "src/pug/data");

module.exports = {
  isDev,
  isProd,
  jsonPugFolder,
  enableImageMinification
}
