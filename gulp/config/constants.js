const isDev = process.env.MODE === "development"
const isProd = process.env.MODE === "production"

module.exports = {
  isDev,
  isProd
}
