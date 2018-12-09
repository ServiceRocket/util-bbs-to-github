(function () {
  "use strict"
}())

const yargs = require("yargs")

var argv = yargs
  .usage("usage: $0 <command>")
  .commandDir("cmd")
  .demandCommand()
  .argv
