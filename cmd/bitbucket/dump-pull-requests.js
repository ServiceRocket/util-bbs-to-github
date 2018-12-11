(function () {
  "use strict"
}())

import BitbucketHelper from "../../lib/bitbucket/helper"

exports.command = "dump-pull-request <repository> <pull-request> [options]"
exports.desc = "Dump everything about the specified pull request"
exports.builder = (yargs) => {
  return yargs
    .env("BITBUCKET")
    .option("output", {
      alias: "o", 
      choices: ["", ""]
    })
    .demandOption(["url", "username", "password"])
}
exports.handler = async (argv) => {

  let bb = new BitbucketHelper(
    argv.url, 
    {
      username: argv.username,
      password: argv.password
  })

  console.log(await bb.getPullRequest(argv.repository, argv.pullRequest))
}
