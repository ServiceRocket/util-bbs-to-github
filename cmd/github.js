"use strict"

const yargs = require("yargs")

exports.command = 'github <command>'
exports.aliases = ['gh']
exports.desc = 'Do something with Github'
exports.builder = function (yargs) {
  return yargs.commandDir('github')
}
exports.handler = function (argv) {}
