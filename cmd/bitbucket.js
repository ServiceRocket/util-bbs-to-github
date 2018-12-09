(function () {
  "use strict"
}())

const yargs = require("yargs")

exports.command = "bitbucket <command>"
exports.aliases = ["bb"]
exports.desc = "Do something with Bitbucket"
exports.builder = function (yargs) {
  return yargs.commandDir("bitbucket")
}
exports.handler = function (argv) {
  console.log(argv)
}
