const del = require("del")
const config = require("../config/path")

const { root } = config

const clear = function() {
  return del(root)
}

module.exports = clear;
